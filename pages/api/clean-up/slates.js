import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";

export default async (req, res) => {
  const slates = await Data.getEverySlate();
  for (let slate of slates) {
    let slateOwner = await Data.getUserById({ id: slate.data.ownerId });
    if (!slateOwner || slateOwner.error) {
      console.log(
        `would delete slate with id ${slate.id} because there is no owner found with id ${slate.data.ownerId}`
      );
      //   await Data.deleteSlateById({ id: slate.id });
      continue;
    }
    let ownerLibrary = slateOwner.data.library[0].children;
    let objects = slate.data.objects;
    slate.data.objects = slate.data.objects.filter(async (obj, i) => {
      let library = [];
      if (obj.ownerId !== slate.data.ownerId) {
        let objOwner = await Data.getUserById({ id: obj.ownerId });
        if (!objOwner || objOwner.error) {
          console.log(
            `would delete object with index ${i} in slate ${slate.id} because there is no owner found with id ${obj.ownerId}`
          );
          return false;
        } else {
          library = objOwner.data.library[0].children;
        }
      } else {
        library = ownerLibrary;
      }
      for (let file of library) {
        if (file.ipfs) {
          let cid;
          if (file.ipfs.includes("/ipfs/")) {
            cid = Strings.getCIDFromIPFS(file.ipfs);
          } else {
            cid = file.ipfs;
          }
          if (obj.url.includes(cid)) {
            obj.cid = cid;
            obj.size = file.size;
            break;
          }
        }
      }
      if (!obj.size) {
        console.log(
          `would delete object with index ${i} in slate ${slate.id} because there is no matching file found in the owner with id ${obj.ownerId}`
        );
        return false;
      }
      if (obj.cid) {
        obj.url = Strings.getCIDGatewayURL(obj.cid);
      } else {
        if (!obj.url.includes(Constants.gateways.ipfs)) {
          obj.cid = Strings.urlToCid(obj.url);
          console.log(`...used ${obj.cid} instead as cid`);
          obj.url = Strings.getCIDGatewayURL(obj.cid);
        }
        obj.url = obj.url.replace("https://undefined", "https://");
      }
      delete obj.deeplink;
      if (!obj.cid || !obj.size || !obj.url) {
        console.log("FAILED missing an item:");
        console.log(obj);
      }
      return true;
    });
    // let response = await Data.updateSlateById({
    //   id: slate.id,
    //   data: slate.data,
    // });
    // if (!response || response.error) {
    //   console.log(`UPDATE FAILED for slate with id ${slate.id} called ${slate.slatename}`);
    // }
  }
  return res.status(200).send({ decorator: "SERVER_CLEAN_SLATES", data: true });
};
