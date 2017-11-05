//
//  UIAlertController+LabelConfig.h
//  sdbao
//
//  Created by ygj on 2017/11/1.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface UIAlertController (LabelConfig)

/**
 alertController title
 */
@property (nonatomic, strong) UILabel *yf_titleLabel;

/**
 alertController message
 */
@property (nonatomic, strong) UILabel *yf_messageLabel;


@end
