import React from 'react';
import ComponentMapper from './components/ComponentMapper';
import Mapper from './Mapper';
import Preview from './Preview';

const LOG_EVENTS = 1;

// componentName - Имя компонента Component
// component - Сам компонент
// info - Тектовое описание сверху

// map - мапа полей {checkboxes: {...}, inouts: [...]}
// data - данные формы (начальные пропсы компоннта) {name: ''}
// excluded - исключенные поля маппера UIEXComponent ['name']
// args - аргументы обработчиков событий {onClick: ['name', ...]}
// handlers - список обработчиков событий компонента ['onClick']
// additionalHandlers - список доп. обработчиков событий (не компонента) ['onSomeButtonClick']
// stateProps - Список пропсов берущихся из стейта ['name', ...]
// funcs - Контент обработчиков событий для превью {onChange: getSetState(['value']), onSome: () => code}
// consts - Список пропсов которые берутся из констант ['name']
// changeState - Список аргументов обработчика события которое нужно прокинуть в стейт {onChange: 'value'}
// callbacks - Реальные обработчки события в компоненте Demo {onChange: 'handleChange'}
// componentMapperProps - Доп. пропсы прокидывающиеся в маппер UIEXComponent {some: true}
// mapperProps - Доп. пропсы прокидывающиеся в маппер компонента {some: true}
// additionalStateProps - доп. поля стейта которые нужно извлечь из него для других компонентов в рендере ['some']

// customEvents - Доп. события которые нужно выести в отдельных тегах {Wheel: 'You can also wheel to...'}
// customState - Дополнительные параметры стейта для Demo {some: true}
// imports - Доп. импорт компонентов (из других файлов) для превью ['Some']
// additionalImport - Доп. импорт компонентов (из одного файла с компонентом демо) для превью ['Some']
// withoutComponentMapper - признак того что нет маппера UIEXComponent
// unclosable - Признак того что компонент не имеет закрывающегося тега (контента)
// withFragment - Признак того что компонент нужно обернуть во фрагмент

// propsToRender - Пропсы прокидываемые в компонент которые нужно рендерить вида some={this.renderSome()} ['some'] ??????????

export default class Demo extends React.Component {
    constructor(props) {
        super(props);
        const {data, customState} = this.constructor;
		this.state = {
            key: 0,
            data,
            ...customState
		};
    }
    
    render() {
        this.content = this.renderContent();
		return (
			<div>
                {this.renderInfo()}
                {this.renderComponentMapper()}
                {this.renderMapperBefore()}
                {this.renderMapper()}
                {this.renderAdditionalMappers()}
				{this.renderPreview()}
			</div>
		)
    }

    renderInfo() {
        const {info} = this.constructor;
        if (info) {
            return (
                <div className="demo-info">
                    {info}
                </div>
            )
        }
        return null;
    }
    
    renderComponentMapper() {
        const {componentMapperProps, excluded, withoutComponentMapper} = this.constructor;
        if (!withoutComponentMapper) {
            return (
                <ComponentMapper 
                    ref="componentMapper"    
                    isOpen={false}
                    data={this.state.data}
                    excluded={excluded}
                    reactChildren={!!this.content}
                    {...componentMapperProps}
                    onChange={this.handleChangeData}
                />
            )
        }
        return null;
    }
    
    renderMapper() {
        const {componentName, map, mapperProps, handlers, args, customEvents, handlersNote} = this.constructor;
        return (
            <Mapper 
                ref="mapper"
                owner={this}
				name={componentName}
				map={map} 
                data={this.state.data}
                {...mapperProps}
                handlers={handlers}
                args={args}
                customEvents={customEvents}
                onChange={this.handleChangeData}
                handlersNote={handlersNote}
			/>
        )
    }

    renderPreview() {
        const {
            componentName,
            component,
            handlers,
            additionalHandlers,
            args,
            funcs,
            stateProps,
            additionalStateProps,
            consts,
            additionalImport,
            imports,
            componentRef,
            commentBeforeRenderReturn,
            withoutComponentMapper,
            propsToRender,
            withFragment,
            unclosable
        } = this.constructor;
        return (
            <Preview
                owner={this}
                component={component}
                name={componentName}
				data={this.state.data}
				handlers={handlers}
                additionalHandlers={additionalHandlers}
				args={args}
				funcs={funcs}
				stateProps={stateProps}
                additionalStateProps={additionalStateProps}
                renderAdditionalCode={this.renderAdditionalCode}
                consts={consts}
                contentRenderer={this.renderPreviewContent}
                additionalImport={additionalImport}
                renderPreviewNote={this.renderPreviewNote}
                wrapper={this.getPreviewWrap()}
                contentBeforeRenderer={this.renderPreviewCodeBefore}
                contentAfterRenderer={this.renderPreviewCodeAfter}
                isPropAvailable={this.isPropAvailable}
                isConstAvailable={this.isConstAvailable}
                renderPreviewConst={this.renderPreviewConst}
                renderMethods={this.renderMethods}
                imports={imports}
                propsToRender={propsToRender}
                uncontrolled={this.state.data.uncontrolled}
                componentRef={componentRef}
                commentBeforeRenderReturn={commentBeforeRenderReturn}
                contentBeforeClassRenderer={this.renderContentBeforeClass}
                withoutComponentMapper={withoutComponentMapper}
                onRerender={this.handleRerender}
                withFragment={withFragment}
                unclosable={unclosable}
			>
                {this.renderPreviewContentBefore()}
                {this.renderInternal()}
			</Preview>
        )
    }

    renderInternal() {
        const {component: Component, handlers, componentProps} = this.constructor;
        if (Component instanceof Object) {
            const restProps = componentProps || {};
            if (handlers instanceof Array) {
                for (let h of handlers) {
                    restProps[h] = this.getHandler(h);
                }
            }
            const contentBefore = this.renderContentBefore();
            const contentAfter = this.renderContentAfter();
            return (
                <div>
                    {contentBefore}
                    {Boolean(contentBefore) && <br />}
                    {this.renderComponent(Component, restProps)}
                    {Boolean(contentAfter) && <br />}
                    {contentAfter}
                </div>
            )
        }
        return null;
    }

    renderComponent(Component, props) {
        return (
            <Component 
                key={this.state.key}
                ref="component"
                {...this.state.data}
                {...props}
            >
                {this.content || this.state.data.children}
            </Component>
        )
    }

    renderMethods() {
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

    getPreviewWrap() {
        return null;
    }

    renderPreviewCodeBefore() {
		return null;
    }
    
    renderPreviewCodeAfter() {
		return null;
    }

    renderAdditionalCode() {
        return null;
    }
    
    handleRerender = () => {
        const key = this.state.key + 1;
        this.setState({key});
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
            const {uncontrolled} = this.state.data;
            const {changeState, args, callbacks} = this.constructor;
            if (changeState instanceof Object && !uncontrolled) {
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
                const obj = {};
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
                            obj[`${i}: ${args[name][i]}`] = arg;
                        }
                    }
                } else  if (typeof args[name] == 'string') {
                    obj[args[name]] = arg1;
                }
                if (LOG_EVENTS) {
                    this.logEvent(name, obj);
                }
            }
            if (callbacks instanceof Object && typeof callbacks[name] == 'string' && typeof this[callbacks[name]] == 'function') {
                this[callbacks[name]].call(this, arg1, arg2, arg3, arg4);
            }
        }
    }

    logEvent(name, obj) {
        console.info('Fired %c' + this.constructor.component.name + ' %cevent %c' + name, 'color: Green', '', 'color: DodgerBlue', obj);
    }

    renderPreviewNote = () => {
        return null;
    }

    isPropAvailable = () => {
        return true;
    }

    isConstAvailable = () => {
        return false;   
    }

    renderPreviewConst = () => {
		return null;
	}
}