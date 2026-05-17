import { Component, inject, Input, OnInit } from "@angular/core";
import { AgentNameService } from "../../../services/agentName.service";
import { AgentRoleService } from "../../../services/agentRole.service";
import { StatsApiMatchPlayer } from "../StatsApiMapping";
import { DisplayNameService } from "../../../services/displayName.service";

@Component({
  selector: "app-regular-player",
  imports: [],
  templateUrl: "./regular-player.html",
  styleUrl: "./regular-player.css",
})
export class RegularPlayer implements OnInit {
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
