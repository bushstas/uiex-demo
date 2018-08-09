
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
        const {componentName, map, mapperProps, handlers, args} = this.constructor;
        return (
            <Mapper 
				ref="mapper"
				name={componentName}
				map={map} 
                data={this.state.data}
                {...mapperProps}
                handlers={handlers}
                args={args}
                onChange={this.handleChangeData}
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
        return (arg1 = null, arg2 = null, arg3 = null, arg4 = null) => {
            const {changeState, args, callbacks} = this.constructor;
            if (changeState instanceof Object) {
                let key, value = arg1;
                if (typeof changeState[name] == 'string') {
                    key = changeState[name];
                } else if (changeState[name] instanceof Array) {
                    key = changeState[name][0];
                    value = changeState[name][1];
                }
                if (key) {
                    this.setState({ 
                        data: {
                            ...this.state.data,
                            [key]: value
                        }
                    });
                }
            }
            this.fire(name);
            if (args[name]) {
                this.logEvent(name);
                if (args instanceof Object) {
                    if (args[name] instanceof Array) {
                        for (let i = 0; i < args[name].length; i++) {
                            let arg;
                            if (i == 0) {
                                arg = arg1;
                            } else if (i == 1) {
                                arg = arg2;
                            } else if (i == 2) {
                                arg = arg3;
                            } else if (i == 3) {
                                arg = arg4;
                            }
                            this.logEventArg(i + 1, args[name][i], arg);
                        }
                    }
                } else  if (typeof args[name] == 'string') {
                    this.logEventArg(1, args[name], arg1);
                }
                console.log('==================');
            }
            if (callbacks instanceof Object && typeof callbacks[name] == 'string' && typeof this[callbacks[name]] == 'function') {
                this[callbacks[name]].call(this, arg1, arg2, arg3, arg4);
            }
        }
    }
    logEvent(name) {
        console.log('Fired event "' + name + '"');
    }

    logEventArg(index, argName, argValue) {
        console.log('Argument ' + index + ': ' + argName);
        console.log(argValue);
    }
}