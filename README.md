# jq-tooltipstered-image
jq-tooltipstered-image is a jquery widget to manage images with areas that have tooltips.\
jq-tooltipstered-image uses [jquery ui widget](https://api.jqueryui.com/jquery.widget/), [svg.js](http://svgjs.com/) and [tooltipster](http://iamceege.github.io/tooltipster/) under the hood.

## Install

### NPM
```npm i -s jq-tooltipstered-image```

Dependencies
```npm i -s jquery jquery-ui-dist svg.js tooltipster```

### Download
You could download the last version [here](https://github.com/davinchi-finsi/jq-tooltipstered-image/releases).

## Dependencies
- JQuery
- JQuery UI widget
- svg.js
- tooltipster: **optional**, could be replaced by any other tooltip widget. Please go [here](#custom-tooltip)

## What it is?
Have you ever had to create an image map where the areas has tooltips?\
That headache with the tooltip positioning because the map areas doesn't have height or width.\
The boring process to extract the correct coordinates of the image to create the areas.\
Making it responsive?.\
You want to apply styles and animations to the areas but you can't or doesn't work well in the browsers.\
If you are reading this, the answer is probably yes.\
We thought, why not use svg instead of an image map?.\
And those are the reasons why we created this widget.

## How it works?
We want to make easier the process to get the coordinates for the shapes and instead of rendering the shapes with js in each use of the widget, we decide to directly import the svg file and manipulate it.\
The svg has shapes over the image, these shapes will have an id (some editors let you edit the id and other attributes), the widget will use the ids to get the shapes and add the tooltips.\
To be able to manipulate the svg, is necessary load the file by ajax to obtain it as a document, then, the svg document is imported with svg.js and rendered.\
After rendering the svg, the widget looks for the shapes with the provided ids and creates the tooltips for each one.\
Each shape (tooltip) registered will be treated as a **step** with his own properties, states and of course, with his own tooltip. **This widget mustn't be instantiated manually**, but could be extended.\

jq-tooltipstered-image could be used in two ways:

- No sequentially: The user could interact with any of the tooltip in any time
- Sequentially: The tooltips will be disabled until the previous tooltip has been opened and closed. Like a tour. Each step will have css classes to know the state in which it is. For more info please go [here](#sequentially)



## Usage
### 1. Include the dependencies scripts
```html
    <!--Tooltipster is optional, you could use your favourite tooltip library-->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/jquery.tooltipster/4.2.5/css/tooltipster.bundle.min.css" />

    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <!--You could include only the widget file or your custom build of jquery ui-->
    <script type="text/javascript" src="jq-tooltipstered-image/dist/libs/jquery-ui/widget.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/jquery.tooltipster/4.2.5/js/tooltipster.bundle.min.js"></script>
    <!--In order to work properly with svg is necessary include the svg plugin for tooltipster-->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/jquery.tooltipster/4.2.5/js/plugins/tooltipster/SVG/tooltipster-SVG.min.js"></script>
    <script type="text/javascript" src=" https://cdnjs.cloudflare.com/ajax/libs/svg.js/2.6.2/svg.min.js"></script>
    <script type="text/javascript" src="jq-tooltipstered-image/dist/jquery.tooltipstered-image.min.js"></script>
```

You also could use NPM:

```html
    <!--Tooltipster is optional, you could use your favourite tooltip library-->
    <link rel="stylesheet" type="text/css" href="node_modules/tooltipster/dist/css/tooltipster.min.css" />

    <script type="text/javascript" src="node_modules/jquery/dist/jquery.min.js"></script>
    <!--You could include only the widget file or your custom build of jquery ui-->
    <script type="text/javascript" src="node_modules/jq-tooltipstered-image/dist/libs/jquery-ui/widget.min.js"></script>
    <script type="text/javascript" src="node_modules/tooltipster/dist/js/tooltipster.bundle.min.js"></script>
    <!--In order to work properly with svg is necessary include the svg plugin for tooltipster-->
    <script type="text/javascript" src="node_modules/tooltipster/dist/js/plugins/tooltipster/SVG/tooltipster-SVG.min.js"></script>
    <script type="text/javascript" src="node_modules/svg.js/dist/svg.min.js"></script>
    <script type="text/javascript" src="node_modules/jq-tooltipstered-image/dist/jquery.tooltipstered-image.min.js"></script>
```

### 2. Create a container
```html
<div id="myImageMap"></div>
```

### 3. Generate the svg
You will need a svg file with the image and the shapes you want to add the tooltips.\
To generate the svg you could use any free online svg editor, import an image an add the shapes that are going to have the tooltips.\
If you use Inkscape, save the file as "plain svg".

### 4. Extract the ids of the shapes
Each one of the shapes that has been created will have an id, copy all of them.

### 5. Initialize the widget
Initialize the widget with an array of the ids of the step 4 and the text (title) to show in the tooltip.

```typescript
$("#myImageMap").tooltipsteredImage(
    {
        svgUrl:"path/to/svg.svg",
        items:[
            {
                id:"id-shape-1",
                title:"Some text for the tooltip"
            },
            {
                id:"id-shape-2",
                title:"Some text for the tooltip 2"
            }
        ]
    }
);

```

Also is possible use a template, by default the template is managed by tooltipster but could be configured. For more info please go [here](#custom-tooltip)

```html
<div id="myImageMap">
    <div id="tip-1-template">
        <!-- Some html -->
    </div>
</div>
```

```typescript
$("#myImageMap").tooltipsteredImage(
    {
        svgUrl:"path/to/svg.svg",
        items:[
            {
                id:"id-shape-1",
                template:"#tip-1-template"
            },
            {
                id:"id-shape-2",
                title:"Some text for the tooltip 2"
            }
        ]
    }
);
```

## Options
### jq-tooltipstered-image

| Option | Type | Required | Default | Description |
| ------ | ---- | -------- | ------- | ----------- |
| svgUrl | string | true | '' | The url of the svg file to load |
| classes | Object | false | | Css classes for the elements of the widget |
| viewbox | Object, Number[] | false | [0,0,100,100] | The viewbox configuration for the svg root. For more info go to [svg.js viewbox doc](http://svgjs.com/geometry/#svg-viewbox) |
| svgAttr | Object | false | ```{preserveAspectRatio:"xMidYMid meet"}``` | Attributes for the svg root. For more info go to [svg.js attr doc](http://svgjs.com/manipulating/#attributes) |
| autoRun | boolean | false | true | The initialization of the widget is asynchronous, the widget must load the filed by ajax. Until the file is loaded, the widget can't be executed. With autoRun:true the widget will be executed right after load the svg file and processed it. Otherwise, should be executed manually with the "run" function |
| autoStop | boolean | false | false |Once all the tooltips are shown, the widget could be stopped disabling the re opening of the tooltips. |
| initialized | function | null | false | A callback that will be executed after load the svg file and process the shapes |

```typescript
{
    classes:{
        main:"tooltipstered-image",
        waiting:"tooltipstered-image--running",
        completed:"tooltipstered-image--completed"
    },
    svgUrl:"",
    viewbox:[0,0,100,100], // Viewbox for the svg
    svgAttr:{ // Svg.js element attributes
        preserveAspectRatio:"xMidYMid meet"
    },
    autoRun:true,//run the widget when the widget has been initialized
    autoStop:false,//stop the widget when is completed
    initialized:null//Callback invoked when the widget has been initialized
}
```

### jq-tooltipstered-image-step
This widget is the responsable of manage each shape with each tooltip.\
The options could be provided in the `items` option of jq-tooltipstered-image

| Option | Type | Required | Default | Description |
| ------ | ---- | -------- | ------- | ----------- |
| classes | Object | false |         | Css classes for the elements of the widget |
| tooltip | Object | false | {} | Options for the tooltip |
| enableTooltip | function | null | Custom function to manage the enabling of the tooltip |
| disableTooltip | function | null | Custom function to manage the disabling of the tooltip |
| processTitle | function | null | Custom function to process the title attribute |
| processTemplate | function | null | Custom function to process a template for the tooltip |
| destroyTooltip | function | null | Custom function to process the destroying of the tooltip |
| registerTooltipEvents | function | null | Custom function to register the events of the tooltip. The function reciebes two callbacks to invoke, onOpeningCallback and onClosedCallback |
| destroyTooltip | function | null | Custom function to manage the initializing of the tooltip. If it's provided, disableTooltip, enableTooltip and registerTooltipEvents options must be provided as well |

```typescript
{
    classes:{
        main:"tooltipstered-image__step", //class to the root element
        waiting:"tooltipstered-image__step--waiting", // class added when the step is waiting and is disabled
        current:"tooltipstered-image__step--current", // class added when the step is the current but the tooltip hasn't be opened yet
        active:"tooltipstered-image__step--active", // class added when the step is the current and the tooltip of the step is opened
        completed:"tooltipstered-image__step--completed", // class added when the step is the current and the tooltip is closed
        open:"tooltipstered-image__step--open", // class added when the tooltip is open
        disabled:"tooltipstered-image__step--disabled" // class added when the tooltip is disabled in any state
    },
    tooltip:{},//Options for the tooltip
    enableTooltip:null,//Custom function to manage the enabling of the tooltip
    disableTooltip:null,//Custom function to manage the disabling of the tooltip
    processTitle:null,//Custom function to process the title attribute
    processTemplate:null,//Custom function to process a template for the tooltip
    destroyTooltip:null,//Custom function to process the destroying of the tooltip
    registerTooltipEvents:null,//Custom function to register the events of the tooltip. The function reciebes two callbacks to invoke, onOpeningCallback and onClosedCallback
    initTooltip:null//Custom function to manage the initializing of the tooltip. If it's provided, disableTooltip, enableTooltip and registerTooltipEvents options must be provided as well
}
```
### Custom tooltip
By default jq-tooltipstered-image uses tooltipster, which is compatible with svg elements. But is possible use your favourite tooltip plugin instead of tooltipster.\
**Note:** Before changing the tooltip plugin, ensure that the tooltip plugin you will use is compatible with svg elements.\
Also is possible to use different tooltips widgets for each step.\
```typescript
function myInitTooltip(options){
    //this is the widget instance
    this.element.tooltip(options);
}
function myEnableTooltip(){
    this.element.tooltip("enable");
}
function myDisableTooltip(){
    this.element.tooltip("disable");
}
function myProcessTemplate(templateOption){
    //the templateOptions is the template option provided in item

    //if is a jquery selector
    if((typeof templateOption).toLowerCase() === "string"){
        this.element.tooltip("option","content",$(templateOption));
    }else{
        this.element.tooltip("option","content",templateOption);
    }

}
function myDestroyTooltip(){
    //ensure tooltip has been initialized
    if(this.element.data("uiTooltip") != undefined){
        this.element.tooltip("destroy");
    }
}
function myRegisterTooltipEvents(onOpeningCallback, onClosedCallback){
    this.element.on("tooltipopen",onOpeningCallback);
    this.element.on("tooltipclose",onClosedCallback);
}
$("#myImageMap").tooltipsteredImage(
    {
        svgUrl:"path/to/svg.svg",
        items:[
            //This step will use jquery ui tooltip
            {
                id:"tip-1",
                template:"#tip-1-template",
                enableTooltip:myEnableTooltip,
                disableTooltip:myDisableTooltip,
                processTitle:myProcessTitle,
                processTemplate:myProcessTemplate,
                destroyTooltip:myDestroyTooltip,
                registerTooltipEvents:myRegisterTooltipEvents,
                initTooltip:myInitTooltip
            },
            //this one will use tooltipster
            {
                id:"tip-2",
                title:"Some text for the tooltip 2"
            }
        ]
    }
);

```
## Sequentially
jq-tooltipstered-image could be used sequentially, requiring to the user to open the tooltips in the order in which they have been registered.\
The tooltips will be disabled until the previous tooltip has been opened and closed.\
To enable the sequentially mode set `sequentially:true` option:
```typescript
$("#myImageMap").tooltipsteredImage(
    {
        svgUrl:"path/to/svg.svg",
        sequentially:true,
        items:[
            {
                id:"id-shape-1",
                template:"#tip-1-template"
            },
            {
                id:"id-shape-2",
                title:"Some text for the tooltip 2"
            }
        ]
    }
);
```
In order to apply styles and control the state of each step, some css clases are added when each tooltip change of state.\
The available classes are:

- tooltipstered-image__step: class to the root element
- tooltipstered-image__step--waiting: class added when the step is waiting and is disabled
- tooltipstered-image__step--current: class added when the step is the current but the tooltip hasn't be opened yet
- tooltipstered-image__step--active: class added when the step is the current and the tooltip of the step is opened
- tooltipstered-image__step--completed: class added when the tooltip of the step is closed and completed
- tooltipstered-image__step--open: // class added when the tooltip is open
- tooltipstered-image__step--disabled: class added when the tooltip is disabled in any state
