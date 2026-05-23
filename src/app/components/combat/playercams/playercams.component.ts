import { Component, computed, inject, OnInit } from "@angular/core";
import { SafeResourceUrl } from "@angular/platform-browser";
import { DataModelService } from "../../../services/dataModel.service";
import { DisplayNameService } from "../../../services/displayName.service";
import { PlayercamStreamService } from "../../../services/playercamStream.service";
import { OneVersusOneService } from "../../../services/1v1.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-playercams-new",
  imports: [],
  templateUrl: "./playercams.component.html",
  styleUrl: "./playercams.component.css",
})
export class PlayercamsComponent implements OnInit {
  readonly dataModel = inject(DataModelService);
  readonly streamService = inject(PlayercamStreamService);
  readonly oneVsOneService = inject(OneVersusOneService);
  protected route = inject(ActivatedRoute);

  displayNameService = inject(DisplayNameService);
  getDisplayName = (puuid: string, fallback: string) =>
    this.displayNameService.getDisplayName(puuid, fallback);

  isOneVersusOne = computed(() => this.oneVsOneService.isOneVersusOne());
  playercamsDisabled = false;

  ngOnInit() {
    this.streamService.initializeFromTeams();
  }

  getStream(playerFullName: string): SafeResourceUrl | undefined {
    return this.streamService.getStream(playerFullName);
  }

  constructor() {
    this.route.queryParams.subscribe((params) => {
      if ((params["disablePlayercams"] as string) === "1") {
        this.playercamsDisabled = true;
      }
    });
  }
}
