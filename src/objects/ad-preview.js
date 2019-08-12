/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * @flow
 */
import {AbstractCrudObject} from './../abstract-crud-object';

/**
 * AdPreview
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */
export default class AdPreview extends AbstractCrudObject {
  static get Fields () {
    return Object.freeze({
      body: 'body',
    });
  }

  static get AdFormat (): Object {
    return Object.freeze({
      audience_network_instream_video: 'AUDIENCE_NETWORK_INSTREAM_VIDEO',
      audience_network_instream_video_mobile: 'AUDIENCE_NETWORK_INSTREAM_VIDEO_MOBILE',
      audience_network_outstream_video: 'AUDIENCE_NETWORK_OUTSTREAM_VIDEO',
      audience_network_rewarded_video: 'AUDIENCE_NETWORK_REWARDED_VIDEO',
      desktop_feed_standard: 'DESKTOP_FEED_STANDARD',
      facebook_story_mobile: 'FACEBOOK_STORY_MOBILE',
      instagram_standard: 'INSTAGRAM_STANDARD',
      instagram_story: 'INSTAGRAM_STORY',
      instant_article_recirculation_ad: 'INSTANT_ARTICLE_RECIRCULATION_AD',
      instant_article_standard: 'INSTANT_ARTICLE_STANDARD',
      instream_video_desktop: 'INSTREAM_VIDEO_DESKTOP',
      instream_video_mobile: 'INSTREAM_VIDEO_MOBILE',
      marketplace_mobile: 'MARKETPLACE_MOBILE',
      messenger_mobile_inbox_media: 'MESSENGER_MOBILE_INBOX_MEDIA',
      mobile_banner: 'MOBILE_BANNER',
      mobile_feed_basic: 'MOBILE_FEED_BASIC',
      mobile_feed_standard: 'MOBILE_FEED_STANDARD',
      mobile_fullwidth: 'MOBILE_FULLWIDTH',
      mobile_interstitial: 'MOBILE_INTERSTITIAL',
      mobile_medium_rectangle: 'MOBILE_MEDIUM_RECTANGLE',
      mobile_native: 'MOBILE_NATIVE',
      right_column_standard: 'RIGHT_COLUMN_STANDARD',
      suggested_video_desktop: 'SUGGESTED_VIDEO_DESKTOP',
      suggested_video_mobile: 'SUGGESTED_VIDEO_MOBILE',
      watch_feed_mobile: 'WATCH_FEED_MOBILE',
    });
  }
  static get RenderType (): Object {
    return Object.freeze({
      fallback: 'FALLBACK',
    });
  }
}
