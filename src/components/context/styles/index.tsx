// React imports
import { useState, useEffect, useContext, createContext } from 'react';

const StylesContext: React.Context<any> = createContext(null)

export const useStyles = () => {
	return (
		useContext(StylesContext)
	)
}

export const StylesProvider = ({children}: any) => {
	const fetchData = async (tableSchema: string, tableName: string) => {
		const tempUrl = `
	    	${process.env.REACT_APP_API_URL}/
	    	style
	    	?table_schema=${tableSchema}
	    	&table_name=${tableName}
	    `
	  	const url = tempUrl.replace(/\s/g, '');
	  	const res = await fetch(url);
	    const receivedData = await res.json();
	    return receivedData
	}

	const getTilesUrl = (tableSchema: string, tableName: string, x: any, y: any, z: any) => {
		const url = `
	    	${process.env.REACT_APP_API_URL}
	    	/tiles
	    	?table_schema=${tableSchema}
	    	&table_name=${tableName}
	    	&x=${x}
	    	&y=${y}
	    	&z=${z}
	    `.replace(/\s/g, '');
	    return url
	}

	return (
		<StylesContext.Provider value={{ fetchData, getTilesUrl }}>
			{children}
		</StylesContext.Provider>
	)
}

StylesContext.displayName = "StylesContext";