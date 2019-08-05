import {
  CollectionViewer,
  SelectionChange,
  SelectionModel
} from "@angular/cdk/collections";
import { FlatTreeControl } from "@angular/cdk/tree";
import { Component, Injectable, Input, OnInit } from "@angular/core";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IbgeService } from "./ibge.service";

/** Flat node with expandable and level information */
export class IgbeNode {
  constructor(
    public value: any,
    public level = 1,
    public expandable = false,
    public isLoading = false,
    public checked = false
  ) {}
}

/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */
@Injectable()
export class DynamicDataSource {
  dataChange = new BehaviorSubject<IgbeNode[]>([]);

  get data(): IgbeNode[] {
    return this.dataChange.value;
  }
  set data(value: IgbeNode[]) {
    this._treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(
    private _treeControl: FlatTreeControl<IgbeNode>,
    private ibgeService: IbgeService
  ) {}

  connect(collectionViewer: CollectionViewer): Observable<IgbeNode[]> {
    this._treeControl.expansionModel.onChange.subscribe(change => {
      if (
        (change as SelectionChange<IgbeNode>).added ||
        (change as SelectionChange<IgbeNode>).removed
      ) {
        this.handleTreeControl(change as SelectionChange<IgbeNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(
      map(() => this.data)
    );
  }

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<IgbeNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed
        .slice()
        .reverse()
        .forEach(node => this.toggleNode(node, false));
    }
  }

  getChildren(level, id?): Observable<any> {
    if (level === 0) {
      return this.ibgeService.getEstados(id);
    } else if (level === 1) {
      return this.ibgeService.getMesorregioes(id);
    } else if (level === 2) {
      return this.ibgeService.getMicrorregioes(id);
    } else if (level === 3) {
      return this.ibgeService.getMunicipios(id);
    }
  }

  /**
   * Toggle the node, remove from display list
   */
  toggleNode(node: IgbeNode, expand: boolean) {
    node.isLoading = true;
    this.getChildren(node.level, node.value.id).subscribe(children => {
      const index = this.data.indexOf(node);
      if (!children || index < 0) {
        // If no children, or cannot find the node, no op
        return;
      }

      if (expand) {
        const nodes = children.map(
          name =>
            new IgbeNode(
              name,
              node.level + 1,
              node.level <= 4,
              false,
              node.checked
            )
        );
        this.data.splice(index + 1, 0, ...nodes);
      } else {
        let count = 0;
        for (
          let i = index + 1;
          i < this.data.length && this.data[i].level > node.level;
          i++, count++
        ) {}
        this.data.splice(index + 1, count);
      }

      // notify the change
      this.dataChange.next(this.data);
      node.isLoading = false;
    });
  }
}

/**
 * @title Tree with dynamic data
 */
@Component({
  selector: "piece-ibge-tree",
  templateUrl: "ibge-tree.component.html",
  styleUrls: ["ibge-tree.component.scss"]
})
export class IbgeTreeComponent implements OnInit {
  @Input()
  public selectedMunicipios = [];

  constructor(private ibgeService: IbgeService) {
    this.treeControl = new FlatTreeControl<IgbeNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new DynamicDataSource(this.treeControl, ibgeService);

    this.ibgeService.getRegioes().subscribe(res => {
      this.dataSource.data = res.map(r => new IgbeNode(r, 0, true, false));
    });
  }

  ngOnInit() {}

  treeControl: FlatTreeControl<IgbeNode>;
  /** The selection for checklist */
  checklistSelection = new SelectionModel<IgbeNode>(true, []);

  dataSource: DynamicDataSource;

  getLevel = (node: IgbeNode) => node.level;

  isExpandable = (node: IgbeNode) => node.level <= 2;

  hasChild = (_: number, _nodeData: IgbeNode) => _nodeData.expandable;

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: IgbeNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child => child.checked);
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: IgbeNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => child.checked);
    return result && !this.descendantsAllSelected(node);
  }

  toggleSelect(node: IgbeNode, checked: boolean): void {
    node.checked = checked;
    const descendants = this.treeControl.getDescendants(node);
    descendants.map(x => (x.checked = node.checked));

    if (checked) {
      if (node.value.id.toString().length === 7) {
        this.selectedMunicipios.push(node.value.id);
      } else {
        this.ibgeService
          .getMunicipiosByLevel(node.level, node.value.id)
          .subscribe(res => {
            this.selectedMunicipios.push(...res);

            console.log(this.selectedMunicipios);
          });
      }
    } else {
      if (node.value.id.toString().length === 7) {
        this.selectedMunicipios.splice(
          this.selectedMunicipios.indexOf(node.value.id),
          1
        );
      } else {
        this.ibgeService
          .getMunicipiosByLevel(node.level, node.value.id)
          .subscribe(res => {
            res.map(r =>
              this.selectedMunicipios.splice(
                this.selectedMunicipios.indexOf(r),
                1
              )
            );

            console.log(this.selectedMunicipios);
          });
      }
    }
  }

  getParentNode(node: IgbeNode): IgbeNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }
}
