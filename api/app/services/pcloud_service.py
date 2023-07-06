import umap
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler

import os

class PCloudService:
          
  def get_data(self):
    try:
      current_dir = os.path.abspath(os.path.dirname(__file__))
      path = os.path.join(current_dir, f"penguins.csv")

      penguins = pd.read_csv(path)
      penguins = penguins.dropna()
      penguins.species.value_counts()

      #print("=========================== ", penguins.species.value_counts() )

      penguin_data = penguins[
        [
            "bill_length_mm",
            "bill_depth_mm",
            "flipper_length_mm",
            "body_mass_g",
        ]
      ].values
      
      scaled_penguin_data = StandardScaler().fit_transform(penguin_data)
      model = umap.UMAP() 

      fit = model.fit_transform(scaled_penguin_data)
      
      c=[x for x in penguins.species.map({"Adelie":0, "Chinstrap":1, "Gentoo":2})]
      """
      """
   

      return fit, c
    except Exception as e:
      error_message = str(e)
      print ("HHAAA: ", error_message)