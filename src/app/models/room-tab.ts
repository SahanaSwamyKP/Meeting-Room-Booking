import { SlotTab } from "./slot-tab";

export interface RoomTab {
    roomId: number,
    roomName: string,
    capacity: number,
    available: boolean,
    slotTabs: SlotTab
}
