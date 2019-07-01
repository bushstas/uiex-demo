import MainMenu from './MainMenu';


let data = {
	MainMenu
};
export const getSources = () => data;

export const mockSources = (a) => {
	data = a;
};
