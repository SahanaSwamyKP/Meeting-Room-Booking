import { SlotTab } from "./slot-tab"

export interface EmpTab {
    empId: number
    empName: string
    empRole: string
    empEmail: string
    empPassword: string
    available: boolean
    slotTabs: SlotTab[]
}