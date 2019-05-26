# Carousell reddit clone

## frontend


## backend
### storage
The implementation of storages.
Try to reduce the trouble to swap storage options. So `BaseStorage.js` is more like a interface or template, regulating what should be done to provide storage functionality.
In this case, `MemoryStorage.js` provides the option to save data in memory.

### Ranker
The ranker keeps only the trending posts(<= `maxRank`). Everytime a new post becomes pupolar, ranker sorts itself.
Only when a post becomes more popular than the last of trending posts, ranker will add it to trending, sort ranker itself, and remove the last post. Thus the number in trending will remain <= `maxRank`.