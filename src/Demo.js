import React from 'react';
import ComponentMapper from './components/ComponentMapper';
import Mapper from './Mapper';
import Preview from './Preview';

const LOG_EVENTS = false;

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
                ref="componentMapper"    
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
        const {componentName, handlers, args, funcs, stateProps, consts, previewProps, additionalImport} = this.constructor;
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
                additionalImport={additionalImport}
                renderPreviewNote={this.renderPreviewNote}
                isPropAvailable={this.isPropAvailable}
                renderPreviewConst={this.renderPreviewConst}
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
                    {this.renderComponent(Component, restProps)}
                    {this.renderContentAfter()}
                </div>
            )
        }
        return null;
    }

    renderComponent(Component, props) {
        return (
            <Component 
                {...this.state.data}
                {...props}
            >
                {this.renderContent()}
                {this.state.data.children}
            </Component>
        )
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
                let addedData;
                if (typeof changeState[name] == 'string') {
                    addedData = {[changeState[name]]: arg1};
                } else if (changeState[name] instanceof Array) {
                    addedData = {[changeState[name][0]]: changeState[name][1]};
                } else if (changeState[name] instanceof Function) {
                    addedData = changeState[name].call(this, arg1, arg2, arg3, arg4);
                }
                if (addedData) {
                    this.setState({ 
                        data: {
                            ...this.state.data,
                            ...addedData
                        }
                    });
                }
            }
            this.fire(name);
            if (args) {
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
                if (LOG_EVENTS) {
                    console.log('==================');
                }
            }
            if (callbacks instanceof Object && typeof callbacks[name] == 'string' && typeof this[callbacks[name]] == 'function') {
                this[callbacks[name]].call(this, arg1, arg2, arg3, arg4);
            }
        }
    }
    logEvent(name) {
        if (LOG_EVENTS) {
            console.log('Fired event "' + name + '"');
        }
    }

    logEventArg(index, argName, argValue) {
        if (LOG_EVENTS) {
            console.log('Argument ' + index + ': ' + argName);
            console.log(argValue);
        }
    }

    renderPreviewNote = () => {
        return null;
    }

    isPropAvailable = () => {
        return true;
    }

    renderPreviewConst = () => {
		return null;
	}
}