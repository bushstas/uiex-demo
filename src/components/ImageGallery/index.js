import React from 'react';
import Demo from '../../Demo';
import {ImageGallery} from 'uiex/ImageGallery';
import {Image} from 'uiex/Image';
import {ImageViewer} from 'uiex/ImageViewer';
import {Checkbox} from 'uiex/Checkbox';
import {BACKGROUND_SIZES, BACKGROUND_REPEATS, GALLERY_BEHAVIORS} from 'uiex/consts';
import {previewRenderer, getSetState, wrap, tabulation} from '../../utils';

const IMAGES = [
	'1105309/e9fc6247-18b8-4a08-be63-b49d5956bf91/s1200',
	'936467/64b9d9a1-f06b-4920-9294-438d789c11a0/s1200',
	'69339/de65576e-a926-4b7f-a533-b7a819de963c/s1200',
	'245485/7038e246-4e5a-4f5f-909b-74830e6669f1/s1200',
	'1105309/e9fc6247-18b8-4a08-be63-b49d5956bf91/s1200',
	'936467/64b9d9a1-f06b-4920-9294-438d789c11a0/s1200',
	'69339/de65576e-a926-4b7f-a533-b7a819de963c/s1200',
	'245485/7038e246-4e5a-4f5f-909b-74830e6669f1/s1200',
	'1105309/e9fc6247-18b8-4a08-be63-b49d5956bf91/s1200',
	'936467/64b9d9a1-f06b-4920-9294-438d789c11a0/s1200',
	'69339/de65576e-a926-4b7f-a533-b7a819de963c/s1200',
	'245485/7038e246-4e5a-4f5f-909b-74830e6669f1/s1200',
	'1105309/e9fc6247-18b8-4a08-be63-b49d5956bf91/s1200',
	'936467/64b9d9a1-f06b-4920-9294-438d789c11a0/s1200',
	'69339/de65576e-a926-4b7f-a533-b7a819de963c/s1200',
	'245485/7038e246-4e5a-4f5f-909b-74830e6669f1/s1200',
	'1105309/e9fc6247-18b8-4a08-be63-b49d5956bf91/s1200',
	'936467/64b9d9a1-f06b-4920-9294-438d789c11a0/s1200',
	'69339/de65576e-a926-4b7f-a533-b7a819de963c/s1200',
	'245485/7038e246-4e5a-4f5f-909b-74830e6669f1/s1200',
	'1105309/e9fc6247-18b8-4a08-be63-b49d5956bf91/s1200',
	'936467/64b9d9a1-f06b-4920-9294-438d789c11a0/s1200',
	'69339/de65576e-a926-4b7f-a533-b7a819de963c/s1200',
	'245485/7038e246-4e5a-4f5f-909b-74830e6669f1/s1200'
];

const imageViewerPreviewData = {
	images: 'IMAGES'
};

export default class ImageGalleryDemo extends Demo {
	static map = {
		checkboxes: {
			reflected: {
				description: 'Images with reflections'
			},
			realImage: {
				description: 'Real images instead of divs with background'	
			}
		},
		inputs: [
			{
				behavior: {
					description: '',
					options: GALLERY_BEHAVIORS
				},
				columns: {
					description: 'Columns count (only for grid behavior)',
					type: 'number',
					positive: true,
					maxValue: 20
				},
				imageWidth: {
					description: 'Image width (ignored for grid behavior) (Number | Numeric String)',
					type: 'number',
					positive: true,
					maxValue: 400
				},
				imageHeight: {
					description: 'Image height (Number | Numeric String)',
					type: 'number',
					positive: true,
					maxValue: 400
				},
				imageMargin: {
					description: 'Image horizontal and vertical margin (Number | Numeric String)',
					type: 'number',
					positive: true,
					maxValue: 50
				},
				backgroundSize: {
					description: 'Height of delimiter in pixels',
					options: BACKGROUND_SIZES
				},
				backgroundRepeat: {
					description: 'Height of delimiter in pixels',
					options: BACKGROUND_REPEATS
				},
				borderWidth: {
					description: 'Height of delimiter in pixels',
					type: 'number',
					positive: true,
					maxValue: 50
				},
				borderColor: {
					description: 'Height of delimiter in pixels',
					type: 'color',
					uncontrolled: true
				},
				borderRadius: {
					description: 'Height of delimiter in pixels',
					type: 'number',
					positive: true,
					maxValue: 50
				},
				borderOpacity: {
					description: 'Height of delimiter in pixels',
					type: 'number',
					positive: true,
					maxValue: 10
				},
				paleness: {
					description: 'Height of delimiter in pixels',
					type: 'number',
					positive: true,
					maxValue: 10
				},
				hoverBorderWidth: {
					description: 'Height of delimiter in pixels',
					type: 'number',
					positive: true,
					maxValue: 50
				},
				hoverBorderColor: {
					description: 'Height of delimiter in pixels',
					type: 'color',
					uncontrolled: true
				},
				hoverBorderOpacity: {
					description: 'Height of delimiter in pixels',
					type: 'number',
					positive: true,
					maxValue: 10
				},
				hoverPaleness: {
					description: 'Height of delimiter in pixels',
					type: 'number',
					positive: true,
					maxValue: 10
				},
				reflectionHeight: {
					description: 'Height of delimiter in pixels',
					type: 'number',
					positive: true,
					maxValue: 100
				},
				reflectionMargin: {
					description: 'Height of delimiter in pixels',
					type: 'number',
					positive: true,
					maxValue: 20
				},
				reflectionMaskColor: {
					description: 'Height of delimiter in pixels',
					type: 'color',
					uncontrolled: true
				},
				reflectionOpacity: {
					description: 'Height of delimiter in pixels',
					type: 'number',
					positive: true,
					maxValue: 10
				},
				source: {
					description: 'Base path to images (optional) (String)',					
					size: 4,
					readOnly: true
				},
				images: {
					description: 'List of paths to images (or list of path parts if source is defined). An alternative to children (Array<String>)',
					type: 'object',
					options: [
						IMAGES,
						[
							'34158/e8985381-201c-434e-9551-a762516d8683/s1200',
							'49816/0944f999-db16-4f16-8a89-b407440dcd0b/s1200',
							'199965/2011eab1-3a11-4da7-adab-d24e7a01a313/s1200'
						]
					]
				}
			}
		]
	};
	static data = {
		backgroundSize: 'cover',
		columns: 5,
		imageMargin: 10,
		behavior: 'grid',
		imageWidth: 250,
		imageHeight: 200,
		borderRadius: 20,
		reflected: true,
		reflectionMargin: 4,
		reflectionMaskColor: '#F4F4F4',
		borderWidth: 12,
		borderColor: '#FFF',
		borderOpacity: 3,
		source: 'https://avatars.mds.yandex.net/get-pdb',
		images: IMAGES
	};
	static consts = ['source', 'images'];
	static excluded = ['vertical', 'valign', 'align', 'block', 'disabled', 'uncontrolled'];
	static imports = ['Image', 'ImageViewer'];
	static handlers = ['onView'];
	static additionalStateProps = ['isViewerOpen', 'imageIndex'];
	static callbacks = {
		onView: 'handleView'
	};
	static args = {
		onView: ['imageIndex', 'imageSrc']
	};
	static funcs = {
		onView: getSetState({isViewerOpen: true, imageIndex: '$imageIndex'})
	};
	static componentName = 'ImageGallery';
	static component = ImageGallery;
	static withFragment = true

	handleCheckboxChange = (transform) => {
		this.setState({transform});
	}

	renderPreviewNote = () => {
		return (
			<Checkbox
				value={this.state.transform}
				onChange={this.handleCheckboxChange}
				title="Changes Demo Code"
			>
				Transform images into children
			</Checkbox>
		) 
	}

	renderPreviewContent = () => {
		if (!this.state.transform) {
			return '';
		}
		let code = tabulation.render(wrap('{') + wrap('this', 'args') + wrap('.') + 'renderImages' + wrap('()}'));

		return code;;
	}

	renderContentAfter() {
		const {images, source} = this.state.data;
		const {imageIndex} = this.state;
		return (
			<ImageViewer
				source={source}
				images={images}
				initialImageIndex={imageIndex}
				isOpen={this.state.isViewerOpen}
				onClose={this.handleViewerClose}
				width="1000"
				height="500"
			/>
		);
	}

	renderPreviewCodeAfter = () => {
		return previewRenderer.render(this.renderContentAfter(), null, {
			source: 'SOURCE',
			images: 'IMAGES',
			initialImageIndex: 'imageIndex',
			isOpen: 'isViewerOpen',
			onClose: wrap('this', 'args') + wrap('.') + 'handleViewerClose'
		});
	}

	renderAdditionalCode = () => {
		if (this.state.transform) {
        	let code = tabulation.render(wrap('renderImages', 'name') + wrap(' = () ') + wrap('=>', 'keyword2') + wrap(' {'), 1);
        	tabulation.add();
        	code += tabulation.render(wrap('return', 'keyword') + ' IMAGES' + wrap('.') + wrap('map', 'keyword2') + wrap('('), 1);
        	tabulation.add();

        	tabulation.reduce();
        	code += tabulation.render(wrap(');'), 1);
        	tabulation.reduce();
        	code += tabulation.render(wrap('}'));
        	return code;
        }
    }

	isPropAvailable = (name) => {
		if (name == 'images' && this.state.transform) {
			return false;
		}
		return true;
	}

	isConstAvailable = () => {
        return true;
    }
	
	getPreviewWrap = () => {
        return 'Fragment';
    }

    handleView = (imageIndex) => {
    	this.setState({isViewerOpen: true, imageIndex});
    }

    handleViewerClose = () => {
    	this.setState({isViewerOpen: false});
    }
}