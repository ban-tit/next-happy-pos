// import { createContext, useEffect, useState } from "react";
// import { Addon, AddonCategory, Company, Menu, MenuCategory, Location, Table, MenusMenuCategoriesLocations, MenuAddonCategory } from "../typings/types";
// import { config } from "../config/config";
// import { getAccessToken, getSelectedLocationId } from "../utils";

// interface AppContextType {
//     menus: Menu[],
//     menuCategories: MenuCategory[],
//     addons: Addon[],
//     addonCategories: AddonCategory[],
//     locations: Location[],
//     menusAddonCategories: MenuAddonCategory[],
//     menusMenuCategoriesLocations: MenusMenuCategoriesLocations[]
//     company: Company | null,
//     tables: Table[],
//     updateData: (value: any)=> void,
//     fetchData: (accessToken: string)=> void,
//     isLoading: boolean
// }

// export const defaultContext: AppContextType = {
//     menus: [],
//     menuCategories: [],
//     addons: [],
//     addonCategories: [],
//     menusAddonCategories: [],
//     locations: [],
//     menusMenuCategoriesLocations: [],
//     company: null,
//     tables: [],
//     updateData: ()=> {},
//     fetchData: ()=> {},
//     isLoading: false
// }

// export const AppContext= createContext<AppContextType>(defaultContext)

// const AppProvider = (props: any) => {
//     const [data, updateData] = useState(defaultContext)
//     const accessToken = getAccessToken()

//     useEffect(()=>{
//         console.log('in useEffetc 1');

//         if(accessToken) {
//             console.log('in useEffetc 2');

//             fetchData(accessToken)
//             console.log('in useEffetc 3');
//         }
//     }, [accessToken])

//     const fetchData = async (accessToken: string) => {
//         // const response = await fetch(`${config.apiBaseUrl}`, {
//             if(!accessToken) return;
//             updateData({...data, isLoading: true})
//             const response = await fetch(`http://localhost:5000`, {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`
//                 }
//             })
//             const responseJson = await response.json()
//             console.log('appContext responseJson:', responseJson);

//             const {
//                 menus,
//                 menuCategories,
//                 addons,
//                 addonCategories,
//                 locations,
//                 menusMenuCategoriesLocations,
//                 menusAddonCategories,
//                 company,
//                 tables
//             } = responseJson

//         updateData({
//             ...data,
//             menus,
//             menuCategories,
//             addons,
//             addonCategories,
//             locations,
//             menusMenuCategoriesLocations,
//             menusAddonCategories,
//             company,
//             isLoading: false,
//             tables
//         })

//         const selectedLocationId = getSelectedLocationId()
//         if(!selectedLocationId){
//             localStorage.setItem('selectedLocationId', locations[0].id)
//         }
//     }

//     return(
//         <AppContext.Provider value={{...data, updateData, fetchData}}>
//             {props.children}
//         </AppContext.Provider>
//     )
// }

// export default AppProvider;
