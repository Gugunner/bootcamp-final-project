import pickle
import pandas as pd
import sys
import os
sys.path.insert(1, "./ml_models")
path = os.path.join(".","services","pulses.sav")
def createLastYearCorrelation(last_year_registry):
    last_four_years = {"years": []}
    for year in last_year_registry:
        last_four_years["years"].append({
            "year": year["Year"],
            "value": year["Microprocessor clock speed (Hertz (pulses per second))"]
        })

    last_year_auto_correlation = {
        "year": last_four_years["years"][0]["year"],
        "value": int(last_four_years["years"][0]["value"]),
        "t-1": int(last_four_years["years"][1]["value"]),
        "t-1_Diff": int(last_four_years["years"][1]["value"]) - int(last_four_years["years"][2]["value"]),
        "t-2": int(last_four_years["years"][2]["value"]),
        "t-2_Diff": int(last_four_years["years"][2]["value"]) - int(last_four_years["years"][3]["value"])
    }
    return last_year_auto_correlation

def createNewYearCorrelation(last_year_auto_correlation):
    print(f"Last Year Correlation {last_year_auto_correlation}")
    loaded_model = pickle.load(open(path,"rb"))
    new_t_minus_1 = last_year_auto_correlation["value"]
    new_t_diff = last_year_auto_correlation["value"] - last_year_auto_correlation["t-1"]
    new_t_minus_2 = last_year_auto_correlation["t-1"]
    new_t_diff_2 = last_year_auto_correlation["t-1"] - last_year_auto_correlation["t-2"]
    new_year_df = pd.DataFrame({
        "year": int(last_year_auto_correlation["year"])+1,
        "t-1": new_t_minus_1,
        "t-1_Diff": new_t_diff,
        "t-2": new_t_minus_2,
        "t-2_Diff": new_t_diff_2
    },index=['0']).set_index("year")
    new_pulses = loaded_model.predict(new_year_df)[0]
    new_year_index = new_year_df.index[0]
    return {
        "year":int(new_year_index),
        "value": int(new_pulses),
        "t-1": new_t_minus_1,
        "t-1_Diff": new_t_diff,
        "t-2": new_t_minus_2,
        "t-2_Diff": new_t_diff_2
    }