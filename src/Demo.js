
import React from 'react';
import ComponentMapper from './components/ComponentMapper';
import Mapper from './Mapper';
import Preview from './Preview';

export default class Demo extends React.Component {
    constructor(props) {
        super(props);
        const {data, customState} = this.constructor;
		this.state = {
            data,
            ...customState
		};
    }
    
    render() {
		return (
			<div>
                {this.renderComponentMapper()}
                {this.renderMapperBefore()}
                {this.renderMapper()}
                {this.renderAdditionalMappers()}
				{this.renderPreview()}
			</div>
		)
    }
    
    renderComponentMapper() {
        const {componentMapperProps, excluded} = this.constructor;
        return (
            <ComponentMapper 
				isOpen={false}
                data={this.state.data}
                excluded={excluded}
                {...componentMapperProps}
				onChange={this.handleChangeData}
			/>
        )
    }
    
    renderMapper() {
        const {componentName, map, mapperProps} = this.constructor;
        return (
            <Mapper 
				ref="mapper"
				name={componentName}
				map={map} 
                data={this.state.data}
                {...mapperProps}
				onChange={this.handleChangeData}
				handlers={this.constructor.handlers}
			/>
        )
    }

    renderPreview() {
        const {componentName, handlers, args, funcs, stateProps, consts, previewProps} = this.constructor;
        return (
            <Preview
                owner={this}
                name={componentName}
				data={this.state.data}
				handlers={handlers}
				args={args}
				funcs={funcs}
				stateProps={stateProps}
                consts={consts}
                contentRenderer={this.renderPreviewContent}
                {...previewProps}
			>
                {this.renderPreviewContentBefore()}
                {this.renderInternal()}
			</Preview>
        )
    }

    renderInternal() {
        const {component: Component, handlers} = this.constructor;
        if (Component instanceof Object) {
            const restProps = {};
            if (handlers instanceof Array) {
                for (let h of handlers) {
                    restProps[h] = this.getHandler(h);
                }
            }
            return (
                <div>
                    {this.renderContentBefore()}
                    <Component 
                        {...this.state.data}
                        {...restProps}
                    >
                        {this.renderContent()}
                        {this.state.data.children}
                    </Component>
                    {this.renderContentAfter()}
                </div>
            )
        }
        return null;
    }

    renderPreviewContentBefore() {
        return null;
    }

    renderContentBefore() {
        return null;
    }

    renderContentAfter() {
        return null;
    }

    renderMapperBefore() {
        return null;
    }

    renderAdditionalMappers() {
        return null;
    }

    renderContent() {
        return null;
    }

    renderPreviewContent() {
        return null;
    }
    
    handleChangeData = (data) => {
		this.setState({data});
	}

	fire(event) {
		if (this.refs.mapper) {
			this.refs.mapper.fire(event);
		}
    }
    
    getHandler(name) {
        this.handlers = this.handlers || {};
        if (!this.handlers[name]) {
            this.handlers[name] = this.getEventHandler(name);
        }
        return this.handlers[name];
    }

    getEventHandler(name) {
        return (arg1 = null, arg2 = null, arg3 = null) => {
            const {changeState} = this.constructor;
            if (changeState instanceof Object) {
                let key, value = arg1;
                if (typeof changeState[name] == 'string') {
                    key = changeState[name];
                } else if (changeState[name] instanceof Array) {
                    key = changeState[name][0];
                    value = changeState[name][1];
                }
                this.setState({ 
                    data: {
                        ...this.state.data,
                        [key]: value
                    }
                });
            }
            this.fire(name);
        }
    }
}