import { Component, Input, input } from "@angular/core";
import { IShieldData } from "../../../services/Types";

@Component({
  selector: "app-shield-icon",
  templateUrl: "./shield-icon.component.html",
  styleUrl: "./shield-icon.component.css",
  imports: [],
})
export class ShieldIconComponent {
  @Input({ required: true }) type!: IShieldData;
  readonly side = input<string>();
}
