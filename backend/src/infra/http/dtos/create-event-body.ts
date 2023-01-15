import { IsNotEmpty } from "class-validator";

export class CreateEventBody {
  @IsNotEmpty()
  date: string;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
}
