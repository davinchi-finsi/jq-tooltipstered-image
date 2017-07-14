var demo;
(function (demo) {
    //$("#map1").jqTooltipsteredImage();
    $("#demo1").tooltipsteredImage({
        svgUrl: "tortoise.svg",
        items: [
            {
                id: "eye1",
                title: "Some title"
            }
        ],
        autoRun: true
    });
    $("#demo1").on("tooltipsteredImage:completed", function () { return console.log("Completed"); });
})(demo || (demo = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZGVtbztcbihmdW5jdGlvbiAoZGVtbykge1xuICAgIC8vJChcIiNtYXAxXCIpLmpxVG9vbHRpcHN0ZXJlZEltYWdlKCk7XG4gICAgJChcIiNkZW1vMVwiKS50b29sdGlwc3RlcmVkSW1hZ2Uoe1xuICAgICAgICBzdmdVcmw6IFwidG9ydG9pc2Uuc3ZnXCIsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZXllMVwiLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIlNvbWUgdGl0bGVcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBhdXRvUnVuOiB0cnVlXG4gICAgfSk7XG4gICAgJChcIiNkZW1vMVwiKS5vbihcInRvb2x0aXBzdGVyZWRJbWFnZTpjb21wbGV0ZWRcIiwgZnVuY3Rpb24gKCkgeyByZXR1cm4gY29uc29sZS5sb2coXCJDb21wbGV0ZWRcIik7IH0pO1xufSkoZGVtbyB8fCAoZGVtbyA9IHt9KSk7XG4iXSwiZmlsZSI6ImluZGV4LmpzIn0=
