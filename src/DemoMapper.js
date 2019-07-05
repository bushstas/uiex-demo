import React from 'react';
import Mapper from './Mapper';

export default class DemoMapper extends React.PureComponent {
	constructor(props) {
        super(props);
        const {customState} = this.constructor;
        const map = this.initMap();		
		this.state = {
			map, 
			...customState
		};
    }
    
    initMap() {
        return this.constructor.map;
    }

	render() {
		let {isOpen, excluded, data, onChange, handlers, args, componentName, reactChildren} = this.props;
		if (!handlers) {
			handlers = this.constructor.handlers;
		}
		if (!excluded) {
			excluded = this.constructor.excluded;
		}
		if (!args) {
			args = this.constructor.args;
		}
		if (!componentName) {
			componentName = this.constructor.componentName;
		}
		const {formName} = this.constructor;
		return (
			<Mapper 
				ref="mapper"
				owner={this}
				isOpen={isOpen}
				name={componentName}
				excluded={excluded}
				args={args}
				map={this.state.map} 
				data={data}
				reactChildren={reactChildren}
                handlers={handlers}
                formName={formName}
                onChange={onChange}
			/>
		)
    }

	fire(event) {
		if (this.refs.mapper) {
			this.refs.mapper.fire(event);
		}
	}
}