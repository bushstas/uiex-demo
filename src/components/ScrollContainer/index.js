import React from 'react';
import Demo from '../../Demo';
import {getSetState} from '../../utils';
import {ScrollContainer} from 'uiex/ScrollContainer';

const TEXT = 'Lorem ipsum dolor sit amet, at dicam propriae nam, sed case veri ubique ex. Labitur definiebas id eos, repudiare sententiae at sit. Sit animal voluptaria no. Ne mediocrem explicari qui, laboramus aliquando ad his. At iudicabit sadipscing per, nec laudem virtute assentior at. Et nec alienum persecuti, no aeterno nonumes eam.Essent oporteat ius in. Per unum diceret molestie te, vis cu integre democritum. Usu tantas invidunt adipisci cu. Modus regione eos in.Usu ullum fuisset inimicus ei. Per vidit consul vituperata ut, ne inermis mnesarchum mea. Elit duis graece ea usu, fuisset voluptaria his cu. Vivendum molestiae pro ne, te tota nostrum voluptatum mea, pri an aliquam consetetur.Ea omnes animal vix, no sale vidisse appareat sed, pri an latine propriae salutatus. Pri at pericula consectetuer. Quas eligendi et mei, eos epicurei consequat ad, ea sea voluptua consequat. Dicunt invenire his ne, sea ea iusto epicuri eligendi, in nam porro vulputate abhorreant.Animal ornatus mei te, nam modus velit prodesset ea. Has tale minimum scriptorem ne, latine meliore sea ea. Vel et idque iuvaret, per in alia labores similique. His ea sonet patrioque. His eu incorrupte repudiandae.An nec viris labore, ut quo ullum populo. Viris cetero vidisse eos id, mel aliquando theophrastus consectetuer an. In usu movet facilis rationibus, eum ut porro labore signiferumque. Nec aliquip debitis appareat et, vel in probo dignissim. Et exerci accommodare usu. Vel ut ferri iisque vivendum.Vel dicta interesset intellegebat et, has ex decore invidunt. Pri ex iisque debitis, ea duo commune quaestio dignissim. Ullum partem an mea, no sed causae timeam antiopam. Cu apeirian electram deterruisset ius. Eum no natum justo dicant, te dolor civibus molestiae mel. Eu eum assum quando assentior.Usu no nibh elitr appetere, eu accusamus honestatis mea, alia porro forensibus pro ut. Vis affert euismod repudiandae ad. An falli mundi nominati pro, sea similique suscipiantur definitiones ei, cum id suas audiam. Est populo epicuri ne. Vel id munere tibique corrumpit. Ex qui altera quidam vivendo, duo timeam nostrum cu.Populo petentium ad eos. Mei utroque nusquam adolescens an, eos elit epicuri ad. Mea ea purto delenit lobortis. An quo postulant mnesarchum, nostro ponderum similique id qui, in evertitur consequat usu. Ei quo porro invidunt molestiae, cu sit ludus intellegam.Ea purto interpretaris cum. Utroque assentior inciderint an pro. Quem conclusionemque ius at. Eu eam utamur perpetua, ex eam adhuc admodum. Ei autem affert accommodare est, usu tamquam oblique discere id, ei dolores adipiscing eam.';

export default class ScrollContainerDemo extends Demo {
	static map = {
		checkboxes: {
			noTransitionOnDrag: {
				description: 'Content scrolling transition will be off on scroller dragging',
			}
		},		
		inputs: [
			{
				scrollTop: {
					description: 'Scroll position in pixels (Higher priority) (Number | Numeric String)',
					type: 'number',
					maxValue: 5000,
					positive: true,
					example: 300
				},
				scrollTopPercent: {
					description: 'Scroll position in percents from 0 to 100. It\'s not taken into account if "scrollTop" is defined (Number | Numeric String)',
					type: 'number',
					maxValue: 100,
					positive: true,
					decimal: true,
					toFixed: 2,
					example: 50
				},
				scrollStep: {
					description: 'Scroll step from 20 to 500 (Number | Numeric String)',
					type: 'number',
					maxValue: 500,
					positive: true,
					example: 100
				},
				transitionSpeed: {
					description: 'Scroll animation speed from 1 (fast) to 8 (slow). Zero means no animation (Number | Numeric String)',
					type: 'number',
					maxValue: 8,
					positive: true,
					example: 5
				}
			}
		]
	};
	static data = {
		children: TEXT,
		fontSize: 45,
		scrollTopPercent: 50
	};
	static stateProps = ['scrollTop', 'scrollTopPercent'];
	static args = {
		onWheel: ['scrollTop', 'scrollTopPercent']
	};
	static changeState = {
		onWheel: (scrollTop, scrollTopPercent) => {
			return {
				scrollTop,
				scrollTopPercent
			}
		}
	};
	static funcs = {
		onWheel: getSetState(['scrollTop', 'scrollTopPercent'])
	};
	static excluded = ['valign', 'vertical'];
	static handlers = ['onWheel', 'onDisabledWheel'];
	static componentName = 'ScrollContainer';
	static component = ScrollContainer;
	static componentMapperProps = {
		maxHeight: 5000
	};
}