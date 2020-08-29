
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
    });

    const vcsByCountryKeys = Object.keys(vcsByCountry);
    let vcsByCountryForTreemap = vcsByCountryKeys.map(key => {
        const countryKeys = Object.keys(vcsByCountry[key]);
        return {
            name: key,
            parent: "Origin",
            value: vcsByCountry[key].length,
            vcs: vcsByCountry[key]
        }
    });
    vcsByCountryForTreemap = [{name: "Origin", parent: "", value: "" }, ...vcsByCountryForTreemap];
    console.log("VCS By Country",vcsByCountry);
    console.log("VCS By Country Treemap",vcsByCountryForTreemap);
    return vcsByCountryForTreemap;
}