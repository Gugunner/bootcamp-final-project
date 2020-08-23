
const onlyUnique = (val, idx, self) => {
    return self.indexOf(val) === idx;
};

export const getAllVcsByCountry = (startups) => {
    const vcsByCountry = startups.reduce((acc, val, idx) => {
        console.log("idx", idx);
        console.log("acc", acc);
        console.log("val",val);
        const valHQ = val.hq.trim();
        if (idx === 1) {
            const accHQ = acc.hq.trim();
            const countriesAccVCs = acc.investors.split(",").map(inv => inv.trim());
            const countriesValVCs = val.investors.split(",").map(inv => inv.trim());
            let vcs = {};
            countriesAccVCs.forEach(cVC => {
                if (vcs[cVC]) {
                    vcs = {
                        ...vcs,
                        [cVC]: {
                            ...vcs[cVC],
                            [accHQ]: vcs[cVC][accHQ] ? vcs[cVC][accHQ] + 1 : 1
                        }
                    }
                } else {
                    vcs = {
                        ...vcs,
                        [cVC]: {
                            [accHQ]: 1
                        }
                    }
                }
            });
            countriesValVCs.forEach(cVC => {
                if (vcs[cVC]) {
                    vcs = {
                        ...vcs,
                        [cVC]: {
                            ...vcs[cVC],
                            [valHQ]: vcs[cVC][valHQ] ? vcs[cVC][valHQ] + 1 : 1
                        }
                    }
                } else {
                    vcs = {
                        ...vcs,
                        [cVC]: {
                            [valHQ]: 1
                        }
                    }
                }
            });
            return vcs;
        }
        const countriesValVCs = val.investors.split(",").map(inv => inv.trim());
        console.log("")
        let vcs = {};
        countriesValVCs.forEach((cVC,idx) => {
            if(idx === 0) {
                if(acc[cVC]) {
                    vcs = {
                        ...acc,
                        [cVC]: {
                            ...acc[cVC],
                            [valHQ]: acc[cVC][valHQ] ? acc[cVC][valHQ] + 1 : 1
                        }
                    }
                } else {
                    vcs = {
                        ...acc,
                        [cVC]: {
                            [valHQ]: 1
                        }
                    }
                }
            } else {
                if (vcs[cVC]) {
                    vcs = {
                        ...vcs,
                        [cVC]: {
                            ...vcs[cVC],
                            [valHQ]: vcs[cVC][valHQ] ? vcs[cVC][valHQ] + 1 : 1
                        }
                    }
                } else {
                    vcs = {
                        ...vcs,
                        [cVC]: {
                            [valHQ]: 1
                        }
                    }
                }
            }
        });
        //idx 34
        console.log("VCS",vcs);
        return vcs;
    });
    console.log("VCS By Country",vcsByCountry);
    return vcsByCountry;
}