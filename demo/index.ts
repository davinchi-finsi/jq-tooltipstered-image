namespace demo{
    //$("#map1").jqTooltipsteredImage();
    $("#demo1").tooltipsteredImage(
        {
            svgUrl:"tortoise.svg",
            items:[
                {
                    id:"eye1",
                    title:"Some title"
                }
            ],
            autoRun:true
        }
    );
    $("#demo1").on("tooltipsteredImage:completed",()=>console.log("Completed"));
}