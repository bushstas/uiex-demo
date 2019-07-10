import React from 'react';
import Demo from '../../Demo';
import {Gallery} from 'uiex/Gallery';
import {BACKGROUND_SIZES, BACKGROUND_REPEATS, GALLERY_BEHAVIORS} from 'uiex/consts';

export default class GalleryDemo extends Demo {
	static map = {
		checkboxes: {
			reflected: {
				description: 'Height of delimiter in pixels'
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
				reflectionOpacity: {
					description: 'Height of delimiter in pixels',
					type: 'number',
					positive: true,
					maxValue: 10
				},
				images: {
					description: 'List of images urls (Array<String>)',
					type: 'object',
					options: [
						[
							'https://avatars.mds.yandex.net/get-pdb/34158/e8985381-201c-434e-9551-a762516d8683/s1200',
							'https://avatars.mds.yandex.net/get-pdb/49816/0944f999-db16-4f16-8a89-b407440dcd0b/s1200',
							'https://avatars.mds.yandex.net/get-pdb/199965/2011eab1-3a11-4da7-adab-d24e7a01a313/s1200'
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
		images: [
			'https://avatars.mds.yandex.net/get-pdb/1105309/e9fc6247-18b8-4a08-be63-b49d5956bf91/s1200',
			'https://avatars.mds.yandex.net/get-pdb/936467/64b9d9a1-f06b-4920-9294-438d789c11a0/s1200',
			'https://avatars.mds.yandex.net/get-pdb/69339/de65576e-a926-4b7f-a533-b7a819de963c/s1200',
			'https://avatars.mds.yandex.net/get-pdb/245485/7038e246-4e5a-4f5f-909b-74830e6669f1/s1200',
			'https://avatars.mds.yandex.net/get-pdb/1105309/e9fc6247-18b8-4a08-be63-b49d5956bf91/s1200',
			'https://avatars.mds.yandex.net/get-pdb/936467/64b9d9a1-f06b-4920-9294-438d789c11a0/s1200',
			'https://avatars.mds.yandex.net/get-pdb/69339/de65576e-a926-4b7f-a533-b7a819de963c/s1200',
			'https://avatars.mds.yandex.net/get-pdb/245485/7038e246-4e5a-4f5f-909b-74830e6669f1/s1200',
			'https://avatars.mds.yandex.net/get-pdb/1105309/e9fc6247-18b8-4a08-be63-b49d5956bf91/s1200',
			'https://avatars.mds.yandex.net/get-pdb/936467/64b9d9a1-f06b-4920-9294-438d789c11a0/s1200',
			'https://avatars.mds.yandex.net/get-pdb/69339/de65576e-a926-4b7f-a533-b7a819de963c/s1200',
			'https://avatars.mds.yandex.net/get-pdb/245485/7038e246-4e5a-4f5f-909b-74830e6669f1/s1200',
			'https://avatars.mds.yandex.net/get-pdb/1105309/e9fc6247-18b8-4a08-be63-b49d5956bf91/s1200',
			'https://avatars.mds.yandex.net/get-pdb/936467/64b9d9a1-f06b-4920-9294-438d789c11a0/s1200',
			'https://avatars.mds.yandex.net/get-pdb/69339/de65576e-a926-4b7f-a533-b7a819de963c/s1200',
			'https://avatars.mds.yandex.net/get-pdb/245485/7038e246-4e5a-4f5f-909b-74830e6669f1/s1200',
			'https://avatars.mds.yandex.net/get-pdb/1105309/e9fc6247-18b8-4a08-be63-b49d5956bf91/s1200',
			'https://avatars.mds.yandex.net/get-pdb/936467/64b9d9a1-f06b-4920-9294-438d789c11a0/s1200',
			'https://avatars.mds.yandex.net/get-pdb/69339/de65576e-a926-4b7f-a533-b7a819de963c/s1200',
			'https://avatars.mds.yandex.net/get-pdb/245485/7038e246-4e5a-4f5f-909b-74830e6669f1/s1200',
			'https://avatars.mds.yandex.net/get-pdb/1105309/e9fc6247-18b8-4a08-be63-b49d5956bf91/s1200',
			'https://avatars.mds.yandex.net/get-pdb/936467/64b9d9a1-f06b-4920-9294-438d789c11a0/s1200',
			'https://avatars.mds.yandex.net/get-pdb/69339/de65576e-a926-4b7f-a533-b7a819de963c/s1200',
			'https://avatars.mds.yandex.net/get-pdb/245485/7038e246-4e5a-4f5f-909b-74830e6669f1/s1200'
		]
	};
	static excluded = ['vertical', 'valign', 'align', 'block', 'disabled', 'uncontrolled'];
	static componentName = 'Gallery';
	static component = Gallery;
}