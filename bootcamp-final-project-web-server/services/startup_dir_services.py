def get_all_startups(startup_dir):
    print(startup_dir)
    data = {}
    data["startups"] = []
    for startup in startup_dir:
        _id = str(startup["_id"])
        new_dict = {
            "id": _id,
            "name": startup["Name"],
            "desc": startup["Description"],
            "sector": startup["Sector"],
            "stage": startup["Stage"],
            "investors": startup["Investor(s)"],
            "ceo": startup["CEO(s)"],
            "hq": startup["HQ"],
            "market": startup["Market"],
            "foundedDate": startup["Founded"],
            "label": startup["Labels"]
        }
        data["startups"].append(new_dict)
    return data