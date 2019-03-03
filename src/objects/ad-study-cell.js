/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * @flow
 */
import {AbstractCrudObject} from './../abstract-crud-object';
import AbstractObject from './../abstract-object';
import AdAccount from './ad-account';
import AdSet from './ad-set';
import Campaign from './campaign';

/**
 * AdStudyCell
 * @extends AbstractCrudObject
 * @see {@link https://developers.facebook.com/docs/marketing-api/}
 */
export default class AdStudyCell extends AbstractCrudObject {
  static get Fields () {
    return Object.freeze({
      ad_entities_count: 'ad_entities_count',
      control_percentage: 'control_percentage',
      id: 'id',
      name: 'name',
      treatment_percentage: 'treatment_percentage'
    });
  }

  static get CreationTemplate (): Object {
    return Object.freeze({
      automatic_placements: 'AUTOMATIC_PLACEMENTS',
      brand_awareness: 'BRAND_AWARENESS',
      facebook: 'FACEBOOK',
      facebook_audience_network: 'FACEBOOK_AUDIENCE_NETWORK',
      facebook_instagram: 'FACEBOOK_INSTAGRAM',
      facebook_news_feed: 'FACEBOOK_NEWS_FEED',
      facebook_news_feed_in_stream_video: 'FACEBOOK_NEWS_FEED_IN_STREAM_VIDEO',
      high_frequency: 'HIGH_FREQUENCY',
      instagram: 'INSTAGRAM',
      in_stream_video: 'IN_STREAM_VIDEO',
      low_frequency: 'LOW_FREQUENCY',
      medium_frequency: 'MEDIUM_FREQUENCY',
      mobile_optimized_video: 'MOBILE_OPTIMIZED_VIDEO',
      page_post_engagement: 'PAGE_POST_ENGAGEMENT',
      reach: 'REACH',
      tv_commercial: 'TV_COMMERCIAL',
      tv_facebook: 'TV_FACEBOOK',
      video_view_optimization: 'VIDEO_VIEW_OPTIMIZATION'
    });
  }

  getAdAccounts (fields, params, fetchFirstPage = true): AdAccount {
    return this.getEdge(
      AdAccount,
      fields,
      params,
      fetchFirstPage,
      '/adaccounts'
    );
  }

  getAdSets (fields, params, fetchFirstPage = true): AdSet {
    return this.getEdge(
      AdSet,
      fields,
      params,
      fetchFirstPage,
      '/adsets'
    );
  }

  getCampaigns (fields, params, fetchFirstPage = true): Campaign {
    return this.getEdge(
      Campaign,
      fields,
      params,
      fetchFirstPage,
      '/campaigns'
    );
  }

  delete (fields, params): AbstractObject {
    return super.delete(
      params
    );
  }

  get (fields, params): AdStudyCell {
    return this.read(
      fields,
      params
    );
  }

  update (fields, params): AdStudyCell {
    return super.update(
      params
    );
  }
}
