import {retrieveOrderPageDetails} from "@/app/controller/prismaController";
import {MenuItem, FieldType} from "@prisma/client";

export default async function Page({ params }: { params: { order: string } }) {

    const details = await retrieveOrderPageDetails(decodeURI(params.order)) || {name: ''}

    console.log(details)

    return <>
        <div className={"relative isolate px-6 pt-14 lg:px-8"}>
            <div className={"mx-auto max-w-3xl py-32 sm:py-10 lg:py-10 border-2 border-green-700"}>
                <h1 className={"text-5xl content-center text-center"}>{details.partner?.name}</h1>
            </div>


        </div>

        <hr className="my-14 h-0.5 border-t-0 bg-green-700"/>

        <div className={"relative isolate px-6 pt-14 lg:px-8"}>
            <div
                className={"mx-auto max-w-3xl py-32 sm:py-10 lg:py-10 border-2 border-amber-100 grid grid-rows-2 grid-flow-col gap-4 p-5"}>
                <div>
                    <div className={"font-bold"}>{"Customer's Name"}</div>
                    <div>{"Brian Klein"}</div>
                </div>
                <div>
                    <div className={"font-bold"}>{"Restaurant Address"}</div>
                    <div>{details.order.contactAddressLine1}</div>
                    <div>{details.order.contactAddressLine2}</div>
                    <div>{details.order.contactAddressCity}{' '}{details.order.contactAddressState}
                        {', '}{details.order.contactAddressPostalCode}</div>
                </div>
                <div>
                    <div className={"font-bold"}>{"Reservation ref"}</div>
                    <div>{details.order.id}</div>
                </div>
                <div>
                    <div className={"font-bold"}>{"No of Attendees"}</div>
                    <div>{details.order.eventAttendeeCount}</div>
                </div>
            </div>
        </div>

        <div className={"relative isolate px-6 pt-4 lg:px-8"}>
            <div
                className={"mx-auto max-w-3xl py-32 sm:py-10 lg:py-10 grid grid-rows-2 grid-flow-col gap-4"}>
                <div className={"bg-green-700 px-3 p-3 w-64 text-left text-white"}>
                    <h2 className={"text-3xl"}>Menu Selection</h2>
                </div>
                <div className={"pt-4 pb-4 pl-2 w-64 text-left border-2 border-red-200"}>
                    Select one menu
                </div>
            </div>
        </div>

    </>
}

function BuildMenuItems(menuItems: MenuItem[]) {

    return menuItems.map((menuItem, index) => {
        if (menuItem.fieldType === FieldType.TEXTFIELD) {
            return <div style={{padding: "5px"}} key={menuItem.name + index}>
                <span>{menuItem.name}</span>
                <input></input>
            </div>
        }
    })

}