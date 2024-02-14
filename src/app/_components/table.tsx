import RefreshButton from "./refresh-button";

export default function Table( props: { head: any, body: any } ) {

    return (
        <div className="bg-white rounded-t shadow-lg overflow-hidden">
            <table className="table-auto w-full">
                <thead className="p-2 bg-blue-800 text-white border-none rounded-t-lg">
                    <tr>
                        {
                            props.head.map((headName: string, index: number) => <th key={'the_'+index} className="border-s border-e border-blue-400 border-y-slate-100 p-2">{headName}</th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {props.body.length > 0 && props.body.map((elm: any, index: number) => 
                        <tr key={'tr_'+index} className="hover:bg-gray-100">
                            {Object.keys(elm).map((key: string, index: number) => <td key={'tdo_'+index} className="border border-slate-400 px-4 py-3"><span key={'tbo_'+index}>{elm[key]}</span></td>)}
                            <td>
                                <div className="flex justify-evenly">
                                    <button className="border-2 w-full mx-1 rounded  border-blue-700 text-blue-700 p-2">Edit</button>
                                    <button className="border-2 w-full mx-1 rounded border-blue-700 text-blue-700 p-2">Values</button>
                                </div>
                            </td>
                        </tr>
                    )}

                    
                    
                
                </tbody>
            </table>
        </div>
    )

}