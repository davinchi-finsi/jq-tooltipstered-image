var demo;
(function (demo) {
    var $imageMap = $("#myImageMap");
    $imageMap.tooltipsteredImage({
        svgUrl: "./tortoise.svg",
        sequential: true,
        items: [
            {
                id: "id-shape-1",
                title: "This is an eye :)"
            },
            {
                id: "id-shape-2",
                template: "#id-shape-2-template"
            }
        ]
    });
    $imageMap.on("tooltipsteredImage:completed", function () {
        alert("Completed!");
        console.log("Completed");
    });
})(demo || (demo = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZGVtbztcbihmdW5jdGlvbiAoZGVtbykge1xuICAgIHZhciAkaW1hZ2VNYXAgPSAkKFwiI215SW1hZ2VNYXBcIik7XG4gICAgJGltYWdlTWFwLnRvb2x0aXBzdGVyZWRJbWFnZSh7XG4gICAgICAgIHN2Z1VybDogXCIuL3RvcnRvaXNlLnN2Z1wiLFxuICAgICAgICBzZXF1ZW50aWFsOiB0cnVlLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImlkLXNoYXBlLTFcIixcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJUaGlzIGlzIGFuIGV5ZSA6KVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcImlkLXNoYXBlLTJcIixcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCIjaWQtc2hhcGUtMi10ZW1wbGF0ZVwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9KTtcbiAgICAkaW1hZ2VNYXAub24oXCJ0b29sdGlwc3RlcmVkSW1hZ2U6Y29tcGxldGVkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYWxlcnQoXCJDb21wbGV0ZWQhXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkNvbXBsZXRlZFwiKTtcbiAgICB9KTtcbn0pKGRlbW8gfHwgKGRlbW8gPSB7fSkpO1xuIl0sImZpbGUiOiJpbmRleC5qcyJ9
