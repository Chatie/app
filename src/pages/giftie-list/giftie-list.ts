import { Component }    from '@angular/core'
import {
  IonicPage,
  NavController,
  NavParams,
}                       from 'ionic-angular'

import { Brolog }       from 'brolog'

import { UnlockPage }   from '../unlock'

interface Giftie {
  icon:         string,
  title:        string,
  description:  string,
}

@IonicPage()
@Component({
  selector: 'page-giftie-list',
  templateUrl: 'giftie-list.html',
})
export class GiftieListPage {
  public gifties: Giftie[] = [
    {
      icon:         'undo',
      title:        'Auto Reply',
      description:  `Send canned reply automatically for **keywords** set by you.`,
    },
    {
      icon:         'people',
      title:        'Auto Accept Friend Request',
      description:  `Accept friend request for you automatically. Can set **keywords** to only accept request with that.`,
    },
    {
      icon:         'key',
      title:        'Room Inviter',
      description:  `Send a room invitation to friend if received the specified **keywords**.`,
    },
    {
      icon:         'eye',
      title:        'Room Guardian',
      description:  `Protect your **room topic** form being changed by others.`,
    },
    {
      icon:         'megaphone',
      title:        'Mass Message Sender',
      description:  `Send messages to multiple users at once.`,
    },
    {
      icon:         'swap',
      title:        'Interpreter',
      description:  `Transpose messages from one language into another, instantly and accurately.
                      Speaker can use Text or Audio, audience will get Text in the **Target Language**.`,
    },
    {
      icon:         'film',
      title:        'Film Maker',
      description:  `Concatenate multiple Videos/Audios that received.`,
    },
    {
      icon:         'images',
      title:        'Image Digester',
      description:  `Read photo and tell you what's it.`,
    },
    {
      icon:         'eye',
      title:        'Message Tracker',
      description:  `Notice you if any new message matches the keywords you set.`,
    },
    {
      icon:         'microphone',
      title:        'Speech Recongnizer',
      description:  `Write down the text message in a speech for you.`,
    },
  ]

  constructor(
    public log:       Brolog,
    public navCtrl:   NavController,
    public navParams: NavParams,
  ) {
    this.log.verbose('GiftieListPage', 'constructor()')
  }

  public ionViewDidLoad() {
    this.log.verbose('GiftieListPage', 'ionViewDidLoad()')
  }

  public unlock() {
    this.navCtrl.push(UnlockPage)
  }
}
