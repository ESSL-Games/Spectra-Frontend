import { Component, effect, inject, Input, input } from "@angular/core";
import { AgentRoleService } from "../../../services/agentRole.service";
import { DisplayNameService } from "../../../services/displayName.service";

@Component({
  selector: "app-agent-select-player-info",
  imports: [],
  templateUrl: "./player-info.component.html",
  styleUrl: "./player-info.component.css",
})
export class AgentSelectPlayerInfoComponent {
  @Input() player!: any;
  agent = input<string>("");
  locked = input<boolean>(false);

  color = input<string>();
  down = input<boolean>(false);

  getDisplayName = inject(DisplayNameService).getDisplayName;

  previousAgent = "";
  previousLock = false;
  animateSwitch = false;
  animateLock = false;

  switchEffect = effect(() => {
    if (this.agent() !== this.previousAgent) {
      this.previousAgent = this.agent();
      this.animateSwitch = true;

      setTimeout(() => {
        this.animateSwitch = false;
      }, 100);
    }
  });

  getAgentRole(name: string): string {
    return AgentRoleService.getAgentRole(name);
  }
}
