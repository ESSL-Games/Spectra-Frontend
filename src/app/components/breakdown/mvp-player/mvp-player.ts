import { Component, inject, Input, OnInit } from "@angular/core";
import { StatsApiMatchPlayer } from "../StatsApiMapping";
import { AgentNameService } from "../../../services/agentName.service";
import { AgentRoleService } from "../../../services/agentRole.service";
import { TranslatePipe } from "@ngx-translate/core";
import { TranslateKeys } from "../../../services/i18nHelper";
import { DisplayNameService } from "../../../services/displayName.service";

@Component({
  selector: "app-mvp-player",
  imports: [TranslatePipe],
  templateUrl: "./mvp-player.html",
  styleUrl: "./mvp-player.css",
})
export class MvpPlayer implements OnInit {
  TranslateKeys = TranslateKeys;

  displayNameService = inject(DisplayNameService);
  getDisplayName = (puuid: string, fallback: string) =>
    this.displayNameService.getDisplayName(puuid, fallback);

  @Input({ required: true })
  player!: StatsApiMatchPlayer;

  @Input()
  isRight = false;

  agentInternalName = "";

  ngOnInit() {
    this.agentInternalName = AgentNameService.getAgentInternalName(this.player.agent.name ?? "");
  }

  getAgentRole(name: string): string {
    return AgentRoleService.getAgentRole(name);
  }

  round(num: number) {
    return Math.round(num);
  }
}
