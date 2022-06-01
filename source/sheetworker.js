
    const currentVersion = 0.2;
    const tabs = ["character","checks","skills","equipment","config"];
    const checks = ["hitcheck","atkpowcheck","evasion","physdef","magdef","action",
                    "movement","trapdisarm","trapdetect","sense","identify","magic"];

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
            // console.log(`Clicked tab ${tab}`);
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

    checks.forEach(function(check){
        on(`change:${check}_ability_mod change:${check}_hit_mod change:${check}_skill_mod change:${check}_other`,function(){
            let update ={};
            getAttrs([`${check}_ability_mod`, `${check}_hit_mod`, `${check}_skill_mod`,`${check}_other`], function(values){
                let ability = parseInt(values[`${check}_ability_mod`]) | 0;
                let hit = parseInt(values[`${check}_hit_mod`]) | 0;
                let skill = parseInt(values[`${check}_skill_mod`]) | 0;
                let other = parseInt(values[`${check}_other`]) | 0;
                update[`${check}`] = (ability+hit+skill+other);

                setAttrs(update,{silent:true});
            }); 

        });
    });