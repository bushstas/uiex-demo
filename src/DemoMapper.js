import React from 'react';
import Mapper from './Mapper';

export default class DemoMapper extends React.Component {
	constructor(props) {
        super(props);
        const map = this.initMap();		
		this.state = {map};
		this.changeMeasureHandler = this.handleChangeMeasure.bind(this);
    }
    
    initMap() {
        return this.constructor.map;
    }

	render() {
		const {isOpen, excluded, data, onChange, handlers} = this.props;
		return (
			<Mapper 
				ref="mapper"
				isOpen={isOpen}
				name={this.constructor.componentName}
				excluded={excluded}
				map={this.state.map} 
				data={data} 
                handlers={handlers}
                onChange={onChange}
                onChangeMeasure={this.changeMeasureHandler}
			/>
		)
    }

   
    handleChangeMeasure(id, idx, name) {
		const {map} = this.state;
		const {inputs} = map;
		let inp;
		for (let item of inputs) {
			if (item[name]) {
				inp = item[name];
				break;
			}
		}
		if (inp) {
			inp.measure = id;
			if (id == 'px') {
				inp.maxValue = 1000;
			} else {
				inp.maxValue = 100;
            }
        }
        return map;
	}

	fire(event) {
		if (this.refs.mapper) {
			this.refs.mapper.fire(event);
		}
	}
}