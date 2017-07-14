(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'jquery','svg.js','jquery-ui','tooltipster'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports,
            require('jquery'),
            require('svg.js'),
            require('jquery-ui'),
            require('tooltipster')
        );
    } else {
        // Browser globals
        factory((root.jqTooltipsteredImage = {}), root.$, root.SVG);
    }
}(this, function (exports, $, SVG) {
    $.widget("jqtlpi.tooltipsteredImageStep",{
        ON_COMPLETED:"tooltipsteredImageStep:completed",
        STATES:{
            waiting:0,
            current:1,
            active:2,
            completed:3
        },
        options:{
            classes:{
                main:"tooltipstered-image__step",
                waiting:"tooltipstered-image__step--waiting",
                current:"tooltipstered-image__step--current",
                active:"tooltipstered-image__step--active",
                completed:"tooltipstered-image__step--completed",
                disabled:"tooltipstered-image__step--disabled",
            },
            tooltip:{

            },
            enableTooltip:null,//Custom function to manage the enabling of the tooltip
            disableTooltip:null,//Custom function to manage the disabling of the tooltip
            processTitle:null,//Custom function to process the title attribute
            processTemplate:null,//Custom function to process a template for the tooltip
            destroyTooltip:null,//Custom function to process the destroying of the tooltip
            registerTooltipEvents:null,//Custom function to register the events of the tooltip. The function reciebes two callbacks to invoke, onOpeningCallback and onClosedCallback
            initTooltip:null//Custom function to manage the initializing of the tooltip. If it's provided, disableTooltip, enableTooltip and registerTooltipEvents options must be provided as well
        },
        _create:function(){
            this.refresh();
            this._registerTooltipEvents();
        },
        /**
         * Set the waiting state.
         * @private
         */
        _setStateWaiting:function(){
            this._currentState = this.STATES.waiting;
            this.element.removeClass(this.options.classes.current);
            this.element.removeClass(this.options.classes.active);
            this.element.addClass(this.options.classes.waiting);
            this._disableTooltip();
        },
        /**
         * Set the state of current
         * @private
         */
        _setStateCurrent:function(){
            if(this._currentState === this.STATES.waiting) {
                this._currentState = this.STATES.current;
                this.element.removeClass(this.options.classes.waiting);
                this.element.addClass(this.options.classes.current);
                this._enableTooltip();
            }
        },
        /**
         * Set the active state
         * @private
         */
        _setStateActive:function(){
            if(this._currentState === this.STATES.current) {
                this._currentState = this.STATES.active;
                this.element.removeClass(this.options.classes.current);
                this.element.addClass(this.options.classes.active);
            }
        },
        /**
         * Set the completed state
         * @private
         */
        _setStateCompleted:function(){
            if(this._currentState === this.STATES.active) {
                this._currentState = this.STATES.completed;
                this.element.removeClass(this.options.classes.active);
                this.element.addClass(this.options.classes.completed);
            }
        },
        /**
         * Set a state by id. See STATES
         * @param state
         * @private
         */
        _setState:function(state){
            switch(state){
                case this.STATES.waiting:
                    this._setStateWaiting();
                    break;
                case this.STATES.current:
                    this._setStateCurrent();
                    break;
                case this.STATES.active:
                    this._setStateActive();
                    break;
                case this.STATES.completed:
                    this._setStateCompleted();
                    break;
            }  
        },
        /**
         * Refresh the widget rebuilding the tooltip
         */
        refresh:function(){
            this._destroyTooltip();
            this._processTitle();
            this._processTemplate();
            this._initTooltip(this.options.tooltip);
            this._setState(this.STATES.waiting);
        },
        /**
         * Enable the step going to the "current" state
         */
        run:function(){
            this._setState(this.STATES.current);
        },
        /**
         * Disable the step. Goes back to the waiting state
         */
        reset:function(){
            this._setState(this.STATES.waiting);
        },
        /**
         * Process the title. By default, gets the option title and set the value to the attribute title of the svg element.
         * If the processTitle option is provided it will be used instead of the default behavior
         * @private
         */
        _processTitle:function(){
            if((typeof this.options.processTitle).toLowerCase() == "function") {
                this.options.processTitle.call(this);
            }else{
                if (this.options.title != undefined) {
                    this.element.attr("title", this.options.title);
                }
            }
        },
        /**
         * Process the template. By default, gets the option processTemplate and set the value to the attribute data-tooltip-content of the svg element.
         * If the processTemplate option is provided it will be used instead of the default behavior
         * @private
         */
        _processTemplate:function(){
            if((typeof this.options.processTemplate).toLowerCase() == "function") {
                if(this.options.template != undefined) {
                    this.options.processTemplate.call(this,this.options.template);
                }
            }else{
                if (this.options.template != undefined) {
                    this.element.attr("data-tooltip-content", this.options.template);
                }
            }
        },
        /**
         * Destroys the tooltip
         * If the destroyTooltip option is provided it will be used instead of the default behavior
         * @private
         */
        _destroyTooltip:function(){
            if((typeof this.options.destroyTooltip).toLowerCase() == "function") {
                this.options.destroyTooltip.call(this);
            }else{
                if(this.element.data("tooltipsterNs")) {
                    let tooltip = this.element.data(this.element.data("tooltipsterNs")[0]);
                    tooltip.destroy();
                }
            }
        },
        /**
         * Initialize the tooltip.
         * If the initTooltip option is provided it will be used instead of the default behavior.
         * If the initTooltip option is provided, disableTooltip, enableTooltip and registerTooltipEvents options must be provided as well
         * @private
         */
        _initTooltip:function(options){
            if((typeof this.options.initTooltip).toLowerCase() == "function") {
                if((typeof this.options.registerTooltipEvents).toLowerCase() == "function") {
                    if((typeof this.options.enableTooltip).toLowerCase() == "function") {
                        if((typeof this.options.disableTooltip).toLowerCase() == "function") {
                            this.options.initTooltip.call(this,options);
                        }else{
                            throw "TooltipsteredImageStepError: If initTooltip option is provided, disableTooltip must be provided as well";
                        }
                    }else{
                        throw "TooltipsteredImageStepError: If initTooltip option is provided, enableTooltip must be provided as well";
                    }
                }else{
                    throw "TooltipsteredImageStepError: If initTooltip option is provided, registerTooltipEvents must be provided as well";
                }
            }else{
                this.element.tooltipster(options);
            }
        },
        /**
         * Register the events for the tooltip
         * If the registerTooltipEvents option is provided it will be used instead of the default behavior.
         * The registerTooltipEvents option receives two functions: onOpenCallback and onCloseCallback that must be attached to the corresponding events
         * @private
         */
        _registerTooltipEvents:function(){
            if((typeof this.options.registerTooltipEvents).toLowerCase() == "function") {
                this.options.registerTooltipEvents.call(this,this._onTooltipOpening.bind(this),this._onTooltipClose.bind(this));
            }else{
                let tooltip = this.element.data(this.element.data("tooltipsterNs")[0]);
                tooltip.on("startend",this._onTooltipOpening.bind(this));
                tooltip.on("closing",this._onTooltipClose.bind(this));
            }
        },

        /**
         * Enable the tooltip
         * If the enableTooltip option is provided it will be used instead of the default behavior.
         * @private
         */
        _enableTooltip:function(){
            if((typeof this.options.enableTooltip).toLowerCase() == "function") {
                this.options.enableTooltip.call(this);
            }else{
                this.element.tooltipster("enable");
            }
        },
        /**
         * Disable the tooltip
         * If the disableTooltip option is provided it will be used instead of the default behavior.
         * @private
         */
        _disableTooltip:function(){
            if((typeof this.options.disableTooltip).toLowerCase() == "function") {
                this.options.disableTooltip.call(this);
            }else{
                this.element.tooltipster("disable");
            }
        },
        /**
         * Invoked when the tooltip starts to open. Update the state
         * @private
         */
        _onTooltipOpening:function(){
            if(this.options.disabled != true) {
                this._setState(this.STATES.active);
            }
        },
        /**
         * Invoked when the tooltip is closed. Update the state
         * @private
         */
        _onTooltipClose:function(){
            if(this.options.disabled != true && this._currentState != this.STATES.completed) {
                this._setState(this.STATES.completed);
                this.element.trigger(this.ON_COMPLETED);
            }

        },
        enable:function(){
            this.options.disabled = false;
            this.element.removeClass(this.options.classes.disabled);
            if(this._currentState != this.STATES.waiting){
                this._enableTooltip();
            }
        },
        disable:function(){
            this.options.disabled = true;
            this.element.addClass(this.options.classes.disabled);
            this._disableTooltip();
        }
    });
    $.widget("ui.tooltipsteredImage",{
        ON_COMPLETED:"tooltipsteredImage:completed",
        options:{
            classes:{
                main:"tooltipstered-image",
                waiting:"tooltipstered-image--running",
                completed:"tooltipstered-image--completed"
            },
            svgUrl:"",
            viewbox:[0,0,100,100],
            svgAttr:{
                preserveAspectRatio:"xMidYMid meet"
            },
            autoRun:true,//run the widget when the widget has been initialized
            autoStop:false,//stop the widget when is completed,
            initialized:null//Callback invoked when the widget has been initialized
        },

        _create:function(){
            this._completed = 0;
            this.element.addClass(this.options.classes.main);
            this.refresh();
        },
        refresh:function(){
            this._clear();
            this._initSvg();
        },
        /**
         * Remove the svg element generated by svg.js
         * @private
         */
        _clear:function(){
            if(this._svgContext){
                this.element.find("#"+this._svgContext.id()).remove();
            }
        },
        /**
         * Applies attributes to the svg root
         * @param {Object}  attrs    Config to apply. See [svg.js attributes doc]{@link http://svgjs.com/manipulating/#attributes}
         * @see [svg.js attributes doc]{@link http://svgjs.com/manipulating/#attributes}
         * @private
         */
        _applySvgAttrs:function(attrs){
            if(this._svgContext) {
                this._svgContext.attr(attrs);
            }
        },
        /**
         * Applies the viewbox config to the svg root
         * @param {Array|Object}    config    Config to apply. Could by an array or an object. Under the hood invokes the viewbox function of svg.js element.
         *                  If the value provided is an array, the array will be passed as individual params.
         *                  Example: config = [0,0,100,100]; will will result in    element.viewbox(0,0,100,100);
         *                  Example: config = {x:0,y:0,width:100,height:100}; will result in element.viewbox({x:0,y:0,width:100,height:100});
         *                  See [svg.js viewbox doc]{@link http://svgjs.com/geometry/#viewbox-as-setter}
         * @see [svg.js viewbox doc]{@link http://svgjs.com/geometry/#viewbox-as-setter}
         * @private
         */
        _applySvgViewbox:function(config){
            if(this._svgContext) {
                if (Array.isArray(config)) {
                    this._svgContext.viewbox.apply(this._svgContext, config);
                } else {
                    this._svgContext.viewbox(config);
                }
            }
        },
        /**
         * Initialize svg.js in the current element.
         * @private
         */
        _initSvg:function(){
            let defer = $.Deferred();
            this._svgContext = SVG(this.element.get(0)).size("100%","100%");
            if(this.options.viewbox){
                this._applySvgViewbox(this.options.viewbox);
                this._applySvgAttrs(this.options.svgAttr);
                let promise = this._loadSvgFile();
                promise.then(this._onProcessedSvgFile.bind(this,defer));
            }
            return defer.promise();
        },
        /**
         * Invoked when the svg file is loaded and processed successfully.
         * Render the svg file with svg.js
         * @param defer     Defer to resolve when the process is finished
         * @param svgString Svg file
         * @private
         */
        _onProcessedSvgFile:function(defer,svgString){
            this._svgContext.svg(svgString);
            this._processSvgElements();
            if((typeof this.options.initialized).toLowerCase() == "function"){
                this.options.initialized(this);
            }
            if(this.options.autoRun == true){
                this.run();
            }
            defer.resolve();
        },
        /**
         * Generate a string of a svg document.
         * @param documentElement   svg document to process
         * @returns {string}
         * @private
         */
        _processSvgFile:function(documentElement){
            let stringSvg = new XMLSerializer().serializeToString(documentElement);
            return stringSvg;
        },
        /**
         * Invoked when the svg file is loaded successfully
         * Process the svg generating a string and resolve the promise
         * @param result
         * @private
         */
        _onGetSvgFileSuccess:function(result){
            //this is the jquery ajax object
            let jqAjaxObject = this,
                //the instance of the widget is in _data.context
                instance = jqAjaxObject._data.context,
                defer = jqAjaxObject._data.defer,
                svgString = instance._processSvgFile(result.documentElement);
            defer.resolveWith(instance,[svgString]);
        },
        _onGetSvgFileFail:function(error){
            console.error("TooltipsteredImageError: The svg file could not be loaded");
            throw error;

        },
        /**
         * Load the svg file and get a string
         * @returns {JQuery.Promise<string>} Promise resolved when the file is loaded and processed successfully
         * @private
         */
        _loadSvgFile:function(){
            let defer = $.Deferred();
            $.ajax({
                method:"GET",
                type:"document",
                url:this.options.svgUrl,
                _data:{
                    context:this,//store the instance of the widget
                    defer:defer
                }
            }).then(this._onGetSvgFileSuccess,this._onGetSvgFileFail);
            return defer.promise();
        },
        /**
         * Process a item element. Search the svg element for the id provided and instantiate  the tooltipsteredImageStep widget
         * Returns the step reference.
         * @param item  Item to process
         * @returns {{stepInstance: any; svg: any; options: any}}
         * @private
         */
        _processSvgElement:function(item){
            let svgElement = SVG.get(item.id);
            if(svgElement != undefined){
                $(svgElement.node).tooltipsteredImageStep($.extend(
                    {
                        svg:svgElement
                    }
                    ,item)
                );
                let $svg = $(svgElement.node),
                    instance = $svg.tooltipsteredImageStep("instance"),
                    processed = {
                        $svg:$svg,
                        stepInstance:instance,
                        svg:svgElement,
                        options:item
                    };
                $svg.off("tooltipsteredImageStep:completed");
                $svg.on("tooltipsteredImageStep:completed",{instance:this},this._onStepCompleted);
                return processed;
            }  
        },
        /**
         * Process all the items with tooltips.
         * For each item invoke _processSvgElement         * 
         * @private
         */
        _processSvgElements:function(){
            if(this._svgContext){
                this._steps = [];
                let items = this.options.items;
                for (let itemIndex = 0, itemsLength = items.length; itemIndex < itemsLength; itemIndex++) {
                    let currentItem = items[itemIndex],
                        step = this._processSvgElement(currentItem);
                    if(step != undefined){
                        this._steps.push(step);                        
                    }
                }
            }
        },
        /**
         * Invoked when a step is completed.
         * Increase the completed counter
         * @param e
         * @private
         */
        _onStepCompleted:function(e){
            //this is the element that fires the event
            let instance = e.data.instance;
            instance._completed++;
            instance._checkCompleted();
        },
        /**
         * Check if the widget is completed
         * @private
         */
        _checkCompleted:function(){
            if(this._completed == this._steps.length){
                if(this.options.autoStop == true) {
                    this.stop();
                }
                this.element.addClass(this.options.classes.completed);
                this.element.trigger(this.ON_COMPLETED);
            }
        },
        /**
         * Stop the widget. The tooltips won't be opened
         * Disables all the steps
         */
        stop:function(){
            if(this._running) {
                this._running = false;
                for (let step of this._steps) {
                    step.stepInstance.disable();
                }
                this.element.removeClass(this.options.classes.running);
            }
        },
        /**
         * Reset all the steps.
         * The widget mustn't be running
         */
        reset:function(){
            if(!this._running) {
                this._completed = 0;
                for (let step of this._steps) {
                    step.stepInstance.reset();
                }
            }
        },
        /**
         * Run the sequence.
         */
        run:function(){
            if(this.options.disabled != true) {
                this._running = true;
                this.element.addClass(this.options.classes.running);
                if(this._completed == 0){
                    if (this.options.sequential) {
                        if (this._steps.length > 0) {
                            this._steps[0].stepInstance.run();
                        }
                    } else {
                        for (let step of this._steps) {
                            step.stepInstance.run();
                        }
                    }
                }
            }
        },
        setOption:function(key,value){
            this._super(key,value);
            switch(key){
                case "viewbox":
                    this._applySvgViewbox(value);
                    break;
                case "svgAttr":
                    this._applySvgAttrs(value);
                    break;
            }
        }
    });
}));
