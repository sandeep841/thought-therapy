# Import necessary libraries
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score

# Load the data with the correct delimiter and ignore errors in lines
try:
    df = pd.read_csv(r'C:\sk\projects\mind theraphy\backend\data.csv', sep='\t', quoting=3, engine='python')
except pd.errors.ParserError as e:
    print(f"Error parsing CSV: {e}")

# Display the first few rows of the DataFrame
df.head()

# Identify categorical columns
categorical_columns = df.select_dtypes(include=['object']).columns

# Apply label encoding to categorical columns
label_encoder = LabelEncoder()
for column in categorical_columns:
    df[column] = label_encoder.fit_transform(df[column])

# Define features (X) and target variable (y)
X = df.drop(columns=['familysize'])  # excluding 'familysize' as it's not part of your target labels
y = df['familysize']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Training SVM model
svm_model = SVC()
svm_model.fit(X_train, y_train)

# Make predictions on the test set
y_pred = svm_model.predict(X_test)

# Evaluate the model using accuracy
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy * 100:.2f}%")
