
    const currentVersion = 0.2;
    const tabs = ["character","checks","skills","equipment","config"];

    function versioning(v){
        switch(v){
            default:
            break;
        }
    };

    function switchPage(value){
        setAttrs({"tab": value});
    }

    on("sheet:opened", function(){
        getAttrs(["version"], function(values){
            let ver = parseFloat(values["version"]);
            if(ver != currentVersion){
                versioning(ver);
            }
        });
    });



    tabs.forEach(function(tab){
        on("clicked:tab_" + tab, function(){
            console.log(`Clicked tab ${tab}`);
            switchPage(tab);
        });
    });

    on("clicked:repeating_skills:lock clicked:lock", function(e){
        let update = {};
        console.log(`Clicked Lock`);
        getAttrs(["repeating_skills_isLocked"], function(values){
            let temp = parseInt(values["repeating_skills_isLocked"]) || 0;
            update["repeating_skills_isLocked"] = (temp + 1) % 2;
            console.log(`Clicked Lock. Set to ${temp}`);

            setAttrs(update);
        });
    });