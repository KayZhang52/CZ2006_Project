import pandas as pd
import sys
df = pd.read_csv (sys.path[0] + r'/dataset1.csv')
print(df.columns)
df.to_json(sys.path[0] + r'/dataset1.json', orient="records")

