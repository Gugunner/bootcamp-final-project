
const onlyUnique = (val, idx, self) => {
    return self.indexOf(val) === idx;
}

export const getAllVcsByCountry = (startups) => {
    const vcsByCountry = startups.reduce((acc, val, idx) => {
        const valHQ = val.hq.trim();
        const countriesValVCs = val.investors.split(",").map(inv => inv.trim());
        if(idx === 1) {
            const accHQ = acc.hq.trim();
            const countriesAccVCs = acc.investors.split(",").map(inv => inv.trim());

            let vcs = {};
            vcs = { ...vcs, [accHQ]:  vcs[accHQ] ? [...vcs[accHQ], ...countriesAccVCs].filter(onlyUnique) : countriesAccVCs };
            vcs = { ...vcs, [valHQ]: vcs[valHQ] ? [...vcs[valHQ] , ...countriesValVCs].filter(onlyUnique) : countriesValVCs };
            return vcs;
        };

        return {
            ...acc,
            [valHQ]: acc[valHQ] ? [...acc[valHQ] , ...countriesValVCs].filter(onlyUnique) : countriesValVCs
        };


    //     if (idx === 1) {
    //         const accHQ = acc.hq.trim();
    //         const countriesAccVCs = acc.investors.split(",").map(inv => inv.trim());
    //         const countriesValVCs = val.investors.split(",").map(inv => inv.trim());
    //         let vcs = {};
    //         countriesAccVCs.forEach(cVC => {
    //             if (vcs[cVC]) {
    //                 vcs = {
    //                     ...vcs,
    //                     [cVC]: {
    //                         ...vcs[cVC],
    //                         [accHQ]: vcs[cVC][accHQ] ? vcs[cVC][accHQ] + 1 : 1
    //                     }
    //                 }
    //             } else {
    //                 vcs = {
    //                     ...vcs,
    //                     [cVC]: {
    //                         [accHQ]: 1
    //                     }
    //                 }
    //             }
    //         });
    //         countriesValVCs.forEach(cVC => {
    //             if (vcs[cVC]) {
    //                 vcs = {
    //                     ...vcs,
    //                     [cVC]: {
    //                         ...vcs[cVC],
    //                         [valHQ]: vcs[cVC][valHQ] ? vcs[cVC][valHQ] + 1 : 1
    //                     }
    //                 }
    //             } else {
    //                 vcs = {
    //                     ...vcs,
    //                     [cVC]: {
    //                         [valHQ]: 1
    //                     }
    //                 }
    //             }
    //         });
    //         return vcs;
    //     }
    //     const countriesValVCs = val.investors.split(",").map(inv => inv.trim());
    //     let vcs = {};
    //     countriesValVCs.forEach((cVC,idx) => {
    //         if(idx === 0) {
    //             if(acc[cVC]) {
    //                 vcs = {
    //                     ...acc,
    //                     [cVC]: {
    //                         ...acc[cVC],
    //                         [valHQ]: acc[cVC][valHQ] ? acc[cVC][valHQ] + 1 : 1
    //                     }
    //                 }
    //             } else {
    //                 vcs = {
    //                     ...acc,
    //                     [cVC]: {
    //                         [valHQ]: 1
    //                     }
    //                 }
    //             }
    //         } else {
    //             if (vcs[cVC]) {
    //                 vcs = {
    //                     ...vcs,
    //                     [cVC]: {
    //                         ...vcs[cVC],
    //                         [valHQ]: vcs[cVC][valHQ] ? vcs[cVC][valHQ] + 1 : 1
    //                     }
    //                 }
    //             } else {
    //                 vcs = {
    //                     ...vcs,
    //                     [cVC]: {
    //                         [valHQ]: 1
    //                     }
    //                 }
    //             }
    //         }
    //     });
    //     return vcs;
    });

    const vcsByCountryKeys = Object.keys(vcsByCountry);
    let vcsByCountryForTreemap = vcsByCountryKeys.map(key => {
        const countryKeys = Object.keys(vcsByCountry[key]);
        // if(countryKeys.length > 0) {
        //     return countryKeys.map(cKey => ({
        //         name: cKey,
        //         parent: key,
        //         value: vcsByCountry[key][cKey]
        //     }));
        // };
        // const cKey = countryKeys[0];
        return {
            name: key,
            parent: "Origin",
            value: vcsByCountry[key].length,
            vcs: vcsByCountry[key].join(", ")
        }
    });
    vcsByCountryForTreemap = [{name: "Origin", parent: "", value: "" }, ...vcsByCountryForTreemap];
    console.log("VCS By Country",vcsByCountry);
    console.log("VCS By Country Treemap",vcsByCountryForTreemap);
    return vcsByCountryForTreemap;
}