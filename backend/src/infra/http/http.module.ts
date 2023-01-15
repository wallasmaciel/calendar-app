import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { EventController } from "./controllers/event.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [EventController],
  providers: [],
})
export class HttpModule {}