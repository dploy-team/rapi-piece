/*
 * Public API Surface of piece
 */

export { MaterialModule } from "./lib/modules/material.module";
export {
  PieceEmptyListModule
} from "./lib/components/empty-list/empty-list.module";
export {
  PieceEmptyListComponent
} from "./lib/components/empty-list/empty-list.component";

export {
  PiecePaginatorComponent
} from "./lib/components/piece-paginator/piece-paginator.component";
export {
  PiecePaginatorModule
} from "./lib/components/piece-paginator/piece-paginator.module";

export {
  PieceProfileAvatarComponent
} from "./lib/components/profile-avatar/profile-avatar.component";
export {
  PieceProfileAvatarModule
} from "./lib/components/profile-avatar/profile-avatar.module";
export * from "./lib/ngrx/ngrx.model";

export {
  AbstractShowPageComponent
} from "./lib/ngrx/abstract-show-page.component";

export { AbstractListComponent } from "./lib/ngrx/abstract-list.component";
export { PieceCityModule } from "./lib/components/piece-city/piece-city.module";
export {
  SearchCityInputConfig
} from "./lib/components/piece-city/search-city-input/search-city-input.component";

export {
  PieceNotFoundLoadingModule
} from "./lib/components/not-found-loading/not-found-loading.module";

/**
 * IBGE
 */
export { IbgeTreeModule } from "./lib/apps/ibge-tree/ibge-tree.module";
export {
  EstadoIbge,
  RegiaoIbge,
  MicrorregiaoIbge,
  MesorregiaoIbge,
  MunicipioIbge
} from "./lib/apps/ibge-tree/ibge.model";
export { IbgeService } from "./lib/apps/ibge-tree/ibge.service";

/**
 * Timeline
 */

export { TimelineModule } from "./lib/components/timeline/timeline.module";
export { PieceTimelineModel } from "./lib/components/timeline/timeline.model";

/**
 * Info Card
 */
export { InfoCardModule } from "./lib/components/info-card/info-card.module";
export {
  InfoCardComponent
} from "./lib/components/info-card/info-card.component";

/**
 * Upload
 */
export { ConfigUpload, UploadService } from "./lib/services/upload.service";

/**
 * Image viewer
 */
export { ImageViewModule } from "./lib/components/image-view/image-view.module";
export {
  ImageViewComponent
} from "./lib/components/image-view/image-view.component";
