import TabsDemo from './components/Tabs';
import TabDemo from './components/Tab';
import ButtonGroupDemo from './components/ButtonGroup';
import BoxDemo from './components/Box';
import BoxSectionDemo from './components/BoxSection';
import SearchFormDemo from './components/SearchForm';
import RateFormDemo from './components/RateForm';
import ModalDemo from './components/Modal';
import SidePanelDemo from './components/SidePanel';
import DelimiterDemo from './components/Delimiter';
import InputDemo from './components/Input';
import InputRegexpDemo from './components/InputRegexp';
import ColorPickerDemo from './components/ColorPicker';
import CellGroupDemo from './components/CellGroup';
import ColorsDemo from './components/Colors';
import InputArrayDemo from './components/InputArray';
import InputDateDemo from './components/InputDate';
import InputPhoneDemo from './components/InputPhone';
import InputNumberDemo from './components/InputNumber';
import InputColorDemo from './components/InputColor';
import AutoCompleteDemo from './components/AutoComplete';
import SelectDemo from './components/Select';
import SliderScaleDemo from './components/SliderScale';
import DraggableDemo from './components/Draggable';
import ArrowDemo from './components/Arrow';
import ButtonDemo from './components/Button';
import ScrollContainerDemo from './components/ScrollContainer';
import TimeScaleDemo from './components/TimeScale';
import CheckboxDemo from './components/Checkbox';
import CheckboxGroupDemo from './components/CheckboxGroup';
import LabelDemo from './components/Label';
import LoaderDemo from './components/Loader';
import AppDemo from './components/App';
import TooltipDemo from './components/Tooltip';
import RendererDemo from './components/Renderer';
import TextBlockDemo from './components/TextBlock';
import HintDemo from './components/Hint';
import FormDemo from './components/Form';
import TouchableDemo from './components/Touchable';
import ImageGalleryDemo from './components/ImageGallery';
import AsyncLoaderDemo from './components/AsyncLoader';

export const MAP = {
	App: {
		App: AppDemo,
		AppPage: AppDemo,
		AppLink: AppDemo
	},
	Button: {
		Button: ButtonDemo,
		ButtonGroup: ButtonGroupDemo,
		Tab: TabDemo,
		Tabs: TabsDemo
	},
	Form: {
		Form: FormDemo,
		FormControl: FormDemo,
		FormControlGroup: FormDemo,
		FormSection: FormDemo
	},
	Box: {
		Box: BoxDemo,
		BoxSection: BoxSectionDemo,
		BoxSectionGroup: BoxSectionDemo
	},
	Input: {
		Input: InputDemo,
		InputArray: InputArrayDemo,
		InputColor: InputColorDemo,
		InputDate: InputDateDemo,
		InputNumber: InputNumberDemo,
		InputPhone: InputPhoneDemo,
		InputRegexp: InputRegexpDemo
	},
	Select: {
		AutoComplete: AutoCompleteDemo,
		Select: SelectDemo
	},
	Checkbox: {
		Checkbox: CheckboxDemo,
		CheckboxGroup: CheckboxGroupDemo,
		Radio: CheckboxDemo,
		RadioGroup: CheckboxGroupDemo
	},
	Text: {
		TextBlock: TextBlockDemo,
		Label: LabelDemo,
		Hint: HintDemo,
		Tooltip: TooltipDemo
	},
	Panel: {
		Modal: ModalDemo,
		SidePanel: SidePanelDemo
	},
	Interactive: {
		ScrollContainer: ScrollContainerDemo,
		Draggable: DraggableDemo,
		Touchable: TouchableDemo,
		SliderScale: SliderScaleDemo,
		TimeScale: TimeScaleDemo
	},
	Grid: {
		CellGroup: CellGroupDemo
	},
	Color: {
		ColorPicker: ColorPickerDemo,
		Colors: ColorsDemo
	},
	Decor: {
		Arrow: ArrowDemo,
		Delimiter: DelimiterDemo,
		Loader:LoaderDemo
	},
	Image: {
		ImageGallery: ImageGalleryDemo
	},
	Forms: {
		RateForm: RateFormDemo,
		SearchForm: SearchFormDemo,
	},
	Helper: {		
		AsyncLoader: AsyncLoaderDemo,
		Renderer: RendererDemo
	}
};
