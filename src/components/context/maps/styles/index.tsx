// React imports
import { useState, useEffect, useContext, createContext } from 'react';

const StylesContext: React.Context<any> = createContext(null)

export const useStyles = () => {
	return (
		useContext(StylesContext)
	)
}

export const StylesProvider = ({children}: any) => {
	const [ styleData, setStyleData ] = useState<any[]>([]);
	const [ styleName, setStyleName ] = useState("jan");

	useEffect(() => {
		const fetchData = async () => {
			const tempUrl = `
		    	${process.env.REACT_APP_API_URL}/
		    	style/
		    	${styleName}
		    `
		  	const url = tempUrl.replace(/\s/g, '');
		  	const res = await fetch(url);
		    const receivedData = await res.json();
		    setStyleData(receivedData);
		}
		fetchData();
	}, [ styleName ])

	return (
		<StylesContext.Provider value={{ styleData, styleName, setStyleName }}>
			{children}
		</StylesContext.Provider>
	)
}

StylesContext.displayName = "StylesContext";