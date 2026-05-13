import { inject, Injectable, signal } from "@angular/core";
import { Config } from "../shared/config";
import { IExtraData } from "./Types";
import { SocketService } from "./SocketService";

@Injectable({
  providedIn: "root",
})
export class DataModelExtraService {
  protected config = inject(Config);

  constructor() {
    if (this.config.extraEnabled == "true") {
      if (!this.config.extraEndpoint || this.config.extraEndpoint.length === 0) {
        console.error("No Extra server endpoint configured, cannot connect to match data");
        return;
      } else {
        SocketService.getInstance().subscribeExtra(this.onExtraUpdate.bind(this));
        SocketService.getInstance().connectExtra(this.config.extraEndpoint);
      }
    }
  }

  private onExtraUpdate(data: any) {
    this.extra.set(data);
  }

  public extra = signal<IExtraData>(initialExtraData, { equal: () => false });
}

const initialExtraData: IExtraData = {
  players: [],
  streamUrlPrefix: "",
  streamUrlSuffix: "",
};
