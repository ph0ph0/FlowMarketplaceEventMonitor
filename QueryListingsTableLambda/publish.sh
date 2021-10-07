# Make sure to switch to correct AWS account in the CLI before running
# Use `export AWS_PROFILE=cryptodappies` in terminal to switch for this session

rm index.zip
cd package
zip -X -r "../index.zip" *
cd ..
aws lambda update-function-code --function-name QueryListingTableLambda --cli-connect-timeout 6000 --debug --zip-file fileb://index.zip
