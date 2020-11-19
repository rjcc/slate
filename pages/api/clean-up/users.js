import * as Data from "~/node_common/data";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";

export default async (req, res) => {
  const users = await Data.getEveryUser(false);
  for (let user of users) {
    if (
      user.data &&
      user.data.library &&
      user.data.library.length &&
      user.data.library[0].children
    ) {
      let library = user.data.library[0].children;
      for (let file of library) {
        delete file.icon;
        if (file.ipfs.includes("/ipfs/")) {
          file.cid = Strings.getCIDFromIPFS(file.ipfs);
        } else {
          file.cid = file.ipfs;
        }
        //NOTE(martina): optional, to clean unity cid string
        // if (file.cid.length > 59) {
        //     file.cid = file.cid.slice(0, 59);
        // }
        delete file.ipfs;
        if (file.ipfs || !file.cid || file.icon) {
          console.log("FAILED! error: missing cid or has ipfs or has icon");
          console.log(file);
        }
      }
      //  let response = Data.updateUserById({ id: user.id, data: user.data});
      // if (!response || response.error) {
      //   console.log(`UPDATE FAILED for user with id ${user.id}`);
      // }
    }
  }
  console.log("finished");
  return res.status(200).send({ decorator: "SERVER_CLEAN_USER", data: true });
};
