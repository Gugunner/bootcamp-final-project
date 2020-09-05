import pickle
import pandas as pd
import sys
import os
sys.path.insert(1, "./ml_models")
# pulses_path = os.path.join(".","services","pulses.sav")
# flops_path = os.path.join(".","services","flops.sav")
def createLastYearCorrelation(last_year_registry, value_term, term):
    last_four_years = {"years": []}
    for year in last_year_registry:
        last_four_years["years"].append({
            "year": year["Year"],
            "value": year[value_term]
        })

    print(f"Last Four Years {last_four_years}")
    last_year_auto_correlation = {
        "year": last_four_years["years"][0]["year"],
        "value": int(last_four_years["years"][0]["value"]),
        "t-1": int(last_four_years["years"][1]["value"]),
        "t-1_Diff": int(last_four_years["years"][1]["value"]) - int(last_four_years["years"][2]["value"]),
        "t-2": int(last_four_years["years"][2]["value"]),
        "t-2_Diff": int(last_four_years["years"][2]["value"]) - int(last_four_years["years"][3]["value"]),
        "term": term
    }
    return last_year_auto_correlation

def createNewYearCorrelation(json_request):
    print(f"Last Year Correlation {json_request}")
    path = {
        "microprocessor": os.path.join(".","services","pulses.sav"),
        "flip-flops": os.path.join(".","services","flops.sav")
    }
    loaded_model = pickle.load(open(path[json_request.term],"rb"))
    new_t_minus_1 = json_request["value"]
    new_t_diff = int(json_request["value"]) - int(json_request["t-1"])
    new_t_minus_2 = int(json_request["t-1"])
    new_t_diff_2 = int(json_request["t-1"]) - int(json_request["t-2"])
    new_year_df = pd.DataFrame({
        "year": int(json_request["year"])+1,
        "t-1": new_t_minus_1,
        "t-1_Diff": new_t_diff,
        "t-2": new_t_minus_2,
        "t-2_Diff": new_t_diff_2
    },index=['0']).set_index("year")
    new_pulses = loaded_model.predict(new_year_df)[0]
    new_year_index = new_year_df.index[0]
    return {
        "year":int(new_year_index),
        "value": int(new_pulses)+int(new_t_minus_2),
        "t-1": new_t_minus_1,
        "t-1_Diff": new_t_diff,
        "t-2": new_t_minus_2,
        "t-2_Diff": new_t_diff_2,
        "term": json_request.term
    }