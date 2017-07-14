namespace demo{
    let $imageMap = $("#myImageMap");
    $imageMap.tooltipsteredImage(
        {
            svgUrl:"./tortoise.svg",
            sequential:true,
            items:[
                {
                    id:"id-shape-1",
                    title:"This is an eye :)"
                },
                {
                    id:"id-shape-2",
                    template:"#id-shape-2-template"
                }
            ]
        }
    );
    $imageMap.on("tooltipsteredImage:completed",()=>{
        alert("Completed!");
        console.log("Completed");
    });
}